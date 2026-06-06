"use server";

import { routeApi } from "@/src/shared/lib/api/route-api";
import {
  getAccessToken,
  getRefreshToken,
} from "@/src/shared/lib/auth/token-cookie";
import type { UserProfile } from "./types/user.types";

export type GetProfileResult =
  | { success: true; profile: UserProfile }
  | { success: false; status: number; error: string };

export async function getProfileAction(): Promise<GetProfileResult> {
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();

  const response = await routeApi<UserProfile>({
    endpoint: "/api/users/me",
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken ?? ""}`,
    },
    refreshToken,
  });

  if (!response.success) {
    return {
      success: false,
      status: response.status,
      error: response.error,
    };
  }

  return { success: true, profile: response.data };
}
