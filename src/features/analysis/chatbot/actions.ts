"use server";

import { routeApi } from "@/src/shared/lib/api/route-api";
import { getAccessToken, getRefreshToken } from "@/src/shared/lib/auth/token-cookie";
import type {
  ChatActionState,
  ChatRequest,
  ChatResponse,
} from "./types/chat.types";

export async function sendChatMessageAction(payload: ChatRequest): Promise<ChatActionState> {
  const question = payload.question?.trim();

  if (!payload.analysis_id || !question) {
    return {
      success: false,
      message: "Lütfen geçerli bir soru girin.",
    };
  }

  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  const response = await routeApi<ChatResponse>({
    endpoint: "/api/transactions/chat",
    method: "POST",
    body: {
      analysis_id: payload.analysis_id,
      question,
    },
    headers: {
      Authorization: `Bearer ${accessToken ?? ""}`,
    },
    refreshToken,
  });

  if (!response.success) {
    return {
      success: false,
      message: "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
    };
  }

  return {
    success: true,
    data: response.data,
  };
}
