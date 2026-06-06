'use server';

import { serverApi } from "@/src/shared/lib/api/server-api";
import { validateFormData } from "@/src/shared/lib/validation/form-validation.ts";
import { resetPasswordSchema } from "@/src/features/auth/reset-password/schema";
import { ResetPasswordResponse } from "@/src/features/auth/reset-password/types/reset.types";
import { redirect } from "next/navigation";

export type ResetPasswordActionState = {
  success: boolean;
  message?: string;
};

export async function resetPasswordAction(
  _prevState: ResetPasswordActionState,
  formData: FormData,
): Promise<ResetPasswordActionState> {
  const validatedData = validateFormData(resetPasswordSchema, formData);

  if (!validatedData.success) {
    return {
      success: false,
      message:
        validatedData.errors.newPassword?.[0] ??
        validatedData.errors.token?.[0] ??
        "Lütfen form alanındaki bilgileri kontrol ediniz.",
    };
  }

  const response = await serverApi<ResetPasswordResponse>({
    endpoint: "/api/auth/reset-password",
    method: "POST",
    body: validatedData.data,
  });

  if (!response.success) {
    return {
      success: false,
      message:
        "Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş. Lütfen tekrar deneyin.",
    };
  }

  redirect("/giris-yap");
}
