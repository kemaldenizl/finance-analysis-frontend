import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/src/shared/lib/api/server-api";
import { ChatResponse } from "@/src/features/analysis/chatbot/types/chat.types";

export async function POST(request: NextRequest) {
    const refreshToken = request.headers.get("Refresh-Token");

    const req = await request.json();

    const response = await serverApi<ChatResponse>({
        endpoint: "/api/transactions/ai-chat",
        method: "POST",
        body: req,
        headers: {
            Authorization: request.headers.get("Authorization") ?? "",
        },
        authRetry: true,
        refreshToken,
        link: true,
    });

    return NextResponse.json(response, { status: response.status });
}