import { NextRequest, NextResponse } from "next/server";
import { serverApi } from "@/src/shared/lib/api/server-api";
import type { UserProfile } from "@/src/features/user/types/user.types";

export async function GET(request: NextRequest) {
  const refreshToken = request.headers.get("Refresh-Token");

  const response = await serverApi<UserProfile>({
    endpoint: "/api/users/me",
    method: "GET",
    headers: {
      Authorization: request.headers.get("Authorization") ?? "",
    },
    authRetry: true,
    refreshToken: refreshToken,
  });

  return NextResponse.json(response, { status: response.status });
}
