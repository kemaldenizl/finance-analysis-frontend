export type VerifyEmailResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
    };

export async function verifyEmail(token: string): Promise<VerifyEmailResult> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message:
          data?.message ??
          "Email doğrulama bağlantısı geçersiz veya süresi dolmuş.",
      };
    }

    return {
      success: true,
      message: data?.message ?? "Email adresiniz başarıyla doğrulandı.",
    };
  } catch {
    return {
      success: false,
      message: "Email doğrulanırken beklenmeyen bir hata oluştu.",
    };
  }
}