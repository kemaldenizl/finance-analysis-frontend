"use server";

import type {
  LoginDto,
  LoginResponse,
} from "@/src/features/auth/login/types/login.types";
import { validateFormData } from "@/src/shared/lib/validation/form-validation.ts";
import { loginSchema } from "./schema";
import { routeApi } from "@/src/shared/lib/api/route-api";
import { setPendingVerificationCookie } from "@/src/shared/lib/auth/pending-verification-cookie";
import { redirect } from "next/navigation";
import { setAuthCookies, setMfaChallengeCookie } from "@/src/shared/lib/auth/token-cookie";

export type LoginActionState = {
  success: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof LoginDto, string[]>>;
};

export async function loginAction(_prevState: LoginActionState, formData: FormData): Promise<LoginActionState> {
  const validatedData = validateFormData(loginSchema,formData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Lütfen form alanındaki bilgileri kontrol ediniz.",
      fieldErrors: validatedData.errors,
    }
  }

  const response = await routeApi<LoginResponse>({
    endpoint: "/api/auth/login",
    method: "POST",
    body: validatedData.data,
  });

  if (!response.success) {
    console.error(response.error);
    return {
      success: false,
      message: "Giriş yapılırken bir hata oluştu.",
    }
  }

  const user = response.data.user;
  if(!user.isActive) {
    return {
      success: false,
      message: "Hesabınız aktif değil. Lütfen destek ile iletişime geçiniz.",
    }
  }

  if(!user.emailVerified) {
    await setPendingVerificationCookie({
      userId: user.id,
      email: user.email,
    });
    redirect(`/email-dogrula`)
  }

  if(response.data.requiresMfa && response.data.mfaChallenge) {
    const challengeToken = response.data.mfaChallenge?.challengeToken;
    const expiresAtUtc = response.data.mfaChallenge?.expiresAtUtc;
    await setMfaChallengeCookie({
      challengeToken: challengeToken,
      expiresAtUtc: expiresAtUtc,
    });
    redirect('/mfa/giris-yap')
  }else{
    const tokens = response.data.tokens;
    await setAuthCookies({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      accessTokenExpiresAtUtc: tokens.accessTokenExpiresAtUtc,
      refreshTokenExpiresAtUtc: tokens.refreshTokenExpiresAtUtc,
    });
    redirect('/mfa/kurulum')
  }
}