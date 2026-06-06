'use server';

import type { RegisterDto, RegisterResponse } from "@/src/features/auth/register/types/register.types";
import { validateFormData } from "@/src/shared/lib/validation/form-validation.ts";
import { registerSchema } from "@/src/features/auth/register/schema";
import { routeApi } from "@/src/shared/lib/api/route-api";
import { redirect } from "next/navigation";
import { setPendingVerificationCookie } from "@/src/shared/lib/auth/pending-verification-cookie";

export type RegisterActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof RegisterDto, string[]>>;
};

export async function registerAction(_prevState: RegisterActionState, formData: FormData): Promise<RegisterActionState> {
  const validatedData = validateFormData(registerSchema,formData);
  
  if (!validatedData.success) {
    return {
      success: false,
      message: "Lütfen form alanındaki bilgileri kontrol ediniz.",
      fieldErrors: validatedData.errors,
    }
  }
  
  const response = await routeApi<RegisterResponse>({
    endpoint: "/api/auth/register",
    method: "POST",
    body: validatedData.data,
  });

  if (!response.success) {
    return {
      success: false,
      message: "Hesap oluşturulurken bir hata oluştu.",
    }
  }

  const user = response.data.user;
  if(!user.emailVerified) {
    await setPendingVerificationCookie({
      userId: user.id,
      email: user.email,
    });
    redirect(`/email-dogrula`)
  }

  redirect('/')
}