"use server";

import { redirect } from "next/navigation";
import { clearAuthCookies, getAccessToken } from "@/src/shared/lib/auth/token-cookie";
import { routeApi } from "@/src/shared/lib/api/route-api";

export type LogoutActionState = {
  success: boolean;
  message?: string;
};

export async function logoutAction() {
  const accessToken = await getAccessToken();
  const response = await routeApi({
    endpoint: "/api/auth/logout",
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken ?? ""}`,
    },
  });
  if (!response.success) {
    return {
      success: false,
      message: "Çıkış yapılırken bir hata oluştu.",
    };
  }
  await clearAuthCookies();
  redirect("/giris-yap");
}
