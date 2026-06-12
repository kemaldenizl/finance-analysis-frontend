"use server";

import { z } from "zod";
import { AnalysisActionState } from "./types/analysis.types";
import { routeApi } from "@/src/shared/lib/api/route-api";
import { AnalysisResponse } from "./types/analysis.types";
import { getAccessToken, getRefreshToken } from "@/src/shared/lib/auth/token-cookie";
import { formDataToObject } from "@/src/shared/lib/validation/form-validation.ts";
import { aiAnalysisSchema } from "./schema";

export async function startAnalysisAction(
    _prevState: AnalysisActionState,
    formData: FormData,
): Promise<AnalysisActionState> {

    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    const data = formDataToObject(formData);
    const transactions = JSON.parse(data.transactions as string);
    const purchaseScenario = JSON.parse(data.purchase_scenario as string);

    const validation = aiAnalysisSchema.safeParse({
        transactions,
        purchase_scenario: purchaseScenario,
    });

    if (!validation.success) {
        return {
            success: false,
            message: "Lütfen girdiğiniz işlem bilgilerini kontrol ediniz.",
            errors: formatValidationErrors(validation.error),
        };
    }

    const payload = {
        input_id: generateId(),
        status: "completed",
        result: {
            transactions: transactions,
            summary: {
                primary_currency: "TRY",
                average_confidence: 1.00,
            }
        },
        scores: {
            summary: {
                overall_confidence: 1.00,
            }
        },
        historical_transactions: transactions,
        question: "En çok harcama yapılan kategori ney?",
        purchase_scenario: purchaseScenario,
        use_llm: true,
    }

    const response = await routeApi<AnalysisResponse>({
        endpoint: "/api/transactions/ai",
        method: "POST",
        body: payload,
        headers: {
            Authorization: `Bearer ${accessToken ?? ""}`,
        },
        refreshToken,
    });

    if (!response.success) {
        return {
            success: false,
            message: "Analysis failed",
        };
    }

    return {
        success: true,
        message: "Analysis started successfully",
        data: response.data
    };
    
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function formatValidationErrors(error: z.ZodError): string[] {
    const messages = error.issues.map((issue) => {
        const [first, second] = issue.path;

        if (first === "transactions" && typeof second === "number") {
            return `Harcama ${second + 1}: ${issue.message}`;
        }

        if (first === "purchase_scenario") {
            return `Taksit senaryosu: ${issue.message}`;
        }

        return issue.message;
    });

    return Array.from(new Set(messages));
}