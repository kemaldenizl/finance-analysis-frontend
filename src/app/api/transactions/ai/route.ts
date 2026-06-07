import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/src/shared/lib/api/server-api";
import { AnalysisResponse } from "@/src/features/analysis/ai-analysis/types/analysis.types";

export async function POST(request: NextRequest) {
    const refreshToken = request.headers.get("Refresh-Token");

    const req = await request.json();

    console.log('AI save request', req);

    const response = await serverApi<AnalysisResponse>({
        endpoint: "/api/transactions/ai-save",
        method: "POST",
        body: req,
        headers: {
          Authorization: request.headers.get("Authorization") ?? "",
        },
        authRetry: true,
        refreshToken,
        link: true,
    });

    console.log('AI save response', response);
    console.log('kled');

    return NextResponse.json(response, { status: response.status });
}