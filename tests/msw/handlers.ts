import { http, HttpResponse } from "msw";
import type { LoginDto, LoginResponse } from "@/src/features/auth/login/types/login.types";
import type { RegisterDto, RegisterResponse } from "@/src/features/auth/register/types/register.types";
import type { ChatResponse } from "@/src/features/analysis/chatbot/types/chat.types";
import type { UserProfile } from "@/src/features/user/types/user.types";

const loginResponse: LoginResponse = {
  user: {
    id: "user-1",
    email: "demo@finpilot.test",
    emailVerified: true,
    isActive: true,
  },
  tokens: {
    accessToken: "access-token",
    accessTokenExpiresAtUtc: "2030-01-01T00:00:00.000Z",
    refreshToken: "refresh-token",
    refreshTokenExpiresAtUtc: "2030-02-01T00:00:00.000Z",
  },
  mfaChallenge: null,
  requiresMfa: false,
};

const registerResponse: RegisterResponse = {
  user: {
    id: "user-2",
    email: "new@finpilot.test",
    emailVerified: false,
    isActive: true,
  },
};

const profileResponse: UserProfile = {
  userId: "user-1",
  email: "demo@finpilot.test",
  sessionId: "session-1",
  accessTokenJti: "jti-1",
  permissions: ["analysis:read", "analysis:write"],
};

const chatResponse: ChatResponse = {
  response: {
    answer: "Bu ay en yüksek harcama kategorin market görünüyor.",
    intent: "category_summary",
    generation_method: "mocked-msw",
  },
};

export const handlers = [
  http.post("http://localhost:3000/api/auth/login", async ({ request }) => {
    const body = (await request.json()) as LoginDto;

    if (body.email === "blocked@finpilot.test") {
      return HttpResponse.json(
        {
          success: false,
          status: 401,
          error: "Invalid credentials.",
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: loginResponse,
      },
      { status: 200 },
    );
  }),

  http.post("http://localhost:3000/api/auth/register", async ({ request }) => {
    const body = (await request.json()) as RegisterDto;

    return HttpResponse.json(
      {
        success: true,
        status: 201,
        data: {
          ...registerResponse,
          user: {
            ...registerResponse.user,
            email: body.email,
          },
        },
      },
      { status: 201 },
    );
  }),

  http.get("http://localhost:3000/api/users/me", ({ request }) => {
    const authorization = request.headers.get("Authorization");

    if (!authorization?.includes("access-token")) {
      return HttpResponse.json(
        {
          success: false,
          status: 401,
          error: "Unauthorized.",
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: profileResponse,
      },
      { status: 200 },
    );
  }),

  http.post("http://localhost:3000/api/transactions/chat", async ({ request }) => {
    const body = (await request.json()) as { analysis_id?: string; question?: string };

    if (!body.analysis_id || !body.question?.trim()) {
      return HttpResponse.json(
        {
          success: false,
          status: 400,
          error: "Question is required.",
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        success: true,
        status: 200,
        data: chatResponse,
      },
      { status: 200 },
    );
  }),
];
