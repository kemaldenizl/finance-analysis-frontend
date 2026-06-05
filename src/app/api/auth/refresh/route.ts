import { NextRequest, NextResponse } from "next/server";
import { requestTokenRefresh } from "@/src/features/auth/refresh/refresh.service";
import type { RefreshDto } from "@/src/features/auth/refresh/refresh.types";
import {
  clearAuthCookies,
  getRefreshToken,
  setAuthCookies,
} from "@/src/shared/lib/auth/token-cookie";

const unauthorized = () =>
  NextResponse.json({ success: false, status: 401 }, { status: 401 });

export async function POST(request: NextRequest) {
  const bodyToken = await request
    .json()
    .then((body: RefreshDto) => body?.refreshToken)
    .catch(() => null);

  const refreshToken = (await getRefreshToken()) ?? bodyToken;

  if (!refreshToken) {
    await clearAuthCookies();
    return unauthorized();
  }

  const refreshed = await requestTokenRefresh(refreshToken);

  if (!refreshed) {
    await clearAuthCookies();
    return unauthorized();
  }

  await setAuthCookies({
    accessToken: refreshed.tokens.accessToken,
    refreshToken: refreshed.tokens.refreshToken,
    accessTokenExpiresAtUtc: refreshed.tokens.accessTokenExpiresAtUtc,
    refreshTokenExpiresAtUtc: refreshed.tokens.refreshTokenExpiresAtUtc,
  });

  return NextResponse.json(
    { success: true, status: 200, tokens: refreshed.tokens },
    { status: 200 },
  );
}
