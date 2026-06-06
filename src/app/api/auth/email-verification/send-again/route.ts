import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/src/shared/lib/api/server-api";
import { SendAgainEmailVerificationResponse } from "@/src/features/auth/email-validate/types/email.types";

export async function POST(request: NextRequest) {
  const body = await request.json() as { email: string };

  const backendResponse = await serverApi<SendAgainEmailVerificationResponse>({
    endpoint: "/api/auth/resend-verification",
    method: "POST",
    body: {
      email: body.email,
    },
  });

  return NextResponse.json({
    message: "Doğrulama linki tekrar gönderildi.",
  });
}