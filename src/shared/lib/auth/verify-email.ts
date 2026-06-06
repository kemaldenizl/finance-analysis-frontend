import { serverApi } from "../api/server-api";
import { ApiResult } from "../api/types";

export type VerifyEmailResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export type VerifyEmailResponse = {
  success: boolean;
  message?: string;
}
export async function verifyEmail(token: string): Promise<VerifyEmailResult> {
  const response = await serverApi<VerifyEmailResponse>({
    endpoint: "/api/auth/verify-email",
    method: "POST",
    body: { token },
  });

  if (!response.success) {
    return {
      success: false,
      message: "Email doğrulama bağlantısı geçersiz veya süresi dolmuş.",
    };
  }

  return {
    success: true,
    message: "Email adresiniz başarıyla doğrulandı.",
  };
}