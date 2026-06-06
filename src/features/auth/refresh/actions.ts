"use server";

import { clearAuthCookies, setAuthCookies } from "@/src/shared/lib/auth/token-cookie";
import { requestTokenRefresh } from "./refresh.service";
import type { RefreshResponse } from "./refresh.types";

export type RefreshResult =
  | { success: true; status: 200; tokens: RefreshResponse["tokens"] }
  | { success: false; status: 401 };

export async function refreshAction(
  refreshToken: string | null,
): Promise<RefreshResult> {
  if (!refreshToken) {
    await clearAuthCookies();
    return { success: false, status: 401 };
  }

  const refreshed = await requestTokenRefresh(refreshToken);

  if (!refreshed) {
    await clearAuthCookies();
    return { success: false, status: 401 };
  }

  await setAuthCookies({
    accessToken: refreshed.tokens.accessToken,
    refreshToken: refreshed.tokens.refreshToken,
    accessTokenExpiresAtUtc: refreshed.tokens.accessTokenExpiresAtUtc,
    refreshTokenExpiresAtUtc: refreshed.tokens.refreshTokenExpiresAtUtc,
  });

  return { success: true, status: 200, tokens: refreshed.tokens };
}
