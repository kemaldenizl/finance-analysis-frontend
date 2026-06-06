import { serverApi } from "../api/server-api";
import { ApiResult } from "../api/types";

export type VerifyPasswordResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export type VerifyPasswordResponse = {
  success: boolean;
  message?: string;
}

export async function verifyPassword(token: string): Promise<VerifyPasswordResult> {
  const response = await serverApi<VerifyPasswordResponse>({
    endpoint: "/api/auth/verify-password",
    method: "POST",
    body: { token },
  });

  if (!response.success) {
    return {
      success: false,
      message: "Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.",
    };
  }

  return {
    success: true,
    message: "Şifre sıfırlama bağlantısı başarıyla doğrulandı.",
  };
}