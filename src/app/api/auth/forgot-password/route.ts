import { ForgotPasswordResponse } from "@/src/features/auth/forgot-password/types/forget.types";
import { serverApi } from "@/src/shared/lib/api/server-api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json() as { email: string };

  const backendResponse = await serverApi<ForgotPasswordResponse>({
    endpoint: "/api/auth/forgot-password",
    method: "POST",
    body: body,
  });

  return NextResponse.json(backendResponse, { status: backendResponse.status });
}