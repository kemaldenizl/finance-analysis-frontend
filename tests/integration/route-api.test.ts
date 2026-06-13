// @vitest-environment node
import { describe, expect, it } from "vitest";
import { routeApi } from "@/src/shared/lib/api/route-api";
import type { LoginDto, LoginResponse } from "@/src/features/auth/login/types/login.types";
import type { ChatResponse } from "@/src/features/analysis/chatbot/types/chat.types";

describe("routeApi integration with MSW", () => {
  it("returns typed login data from the mocked Next route", async () => {
    const result = await routeApi<LoginResponse, LoginDto>({
      endpoint: "/api/auth/login",
      method: "POST",
      body: {
        email: "demo@finpilot.test",
        password: "StrongPassword1!",
      },
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.user.email).toBe("demo@finpilot.test");
      expect(result.data.tokens.accessToken).toBe("access-token");
    }
  });

  it("surfaces API errors without mocking fetch directly", async () => {
    const result = await routeApi<LoginResponse, LoginDto>({
      endpoint: "/api/auth/login",
      method: "POST",
      body: {
        email: "blocked@finpilot.test",
        password: "WrongPassword1!",
      },
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.status).toBe(401);
      expect(result.error).toBe("Invalid credentials.");
    }
  });

  it("sends chat requests through the network layer", async () => {
    const result = await routeApi<ChatResponse>({
      endpoint: "/api/transactions/chat",
      method: "POST",
      body: {
        analysis_id: "analysis-1",
        question: "En yüksek kategorim ne?",
      },
      headers: {
        Authorization: "Bearer access-token",
      },
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.response.answer).toContain("market");
      expect(result.data.response.intent).toBe("category_summary");
    }
  });
});
