"use server";

import { AnalysisActionState } from "./types/analysis.types";
import { routeApi } from "@/src/shared/lib/api/route-api";
import { AnalysisResponse } from "./types/analysis.types";
import { getAccessToken, getRefreshToken } from "@/src/shared/lib/auth/token-cookie";
import { formDataToObject } from "@/src/shared/lib/validation/form-validation.ts";

export async function startAnalysisAction(
    _prevState: AnalysisActionState,
    formData: FormData,
): Promise<AnalysisActionState> {

    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    const data = formDataToObject(formData);
    const transactions = JSON.parse(data.transactions as string);

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
        question: "What is the total amount of transactions?",
        purchase_scenario: {
            amount: 6000,
            currency: "TRY",
            max_installment_months: 12
        },
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

    console.log('Analysis response', response.data.response);

    return {
        success: true,
        message: "Analysis started successfully",
        data: response.data
    };
}

function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}