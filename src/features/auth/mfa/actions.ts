'use server';

import { getAccessToken ,getMfaChallengeCookie, setAuthCookies, clearMfaChallengeCookie, getRefreshToken } from "@/src/shared/lib/auth/token-cookie";
import { routeApi } from "@/src/shared/lib/api/route-api";
import { CreateMfaResponse } from "@/src/features/auth/mfa/types/mfa.types";
import { mfaComplateSchema } from "./schema";
import { validateFormData } from "@/src/shared/lib/validation/form-validation.ts";
import { MfaComplateResponse } from "@/src/features/auth/mfa/types/mfa.types";
import { redirect } from "next/navigation";
import { setRecoveryCodesCookie } from "@/src/shared/lib/auth/recovery-codes-cookie";
import { LoginResponse } from "../login/types/login.types";

export async function createMfa() {
  const accessToken = await getAccessToken();
  const refreshToken = await getRefreshToken();
  const response = await routeApi<CreateMfaResponse>({
    endpoint: "/api/auth/mfa/create",
    method: "POST",
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
    refreshToken: refreshToken,
  });

  if (!response.success) {
    return {
      success: false,
    }
  }

  const result = response.data;

  return result as CreateMfaResponse;
}

export type MfaComplateActionState = {
  success: boolean;
  message?: string;
};

export async function mfaComplateAction(_prevState: MfaComplateActionState, formData: FormData): Promise<MfaComplateActionState> {
  const validatedData = validateFormData(mfaComplateSchema,formData);

  if (!validatedData.success) {
    return {
      success: false,
      message: 'Lütfen 6 haneli doğrulama kodunu giriniz.',
    }
  }
  console.log('validatedData:',validatedData.data);
  const accessToken = await getAccessToken();
  const response = await routeApi<MfaComplateResponse>({
    endpoint: "/api/auth/mfa/complate",
    method: "POST",
    body: validatedData.data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.success) {
    return {
      success: false,
      message: 'MFA doğrulama kodu geçersiz.',
    }
  }

  await setRecoveryCodesCookie(response.data.recoveryCodes);

  console.log('response action:',response);
  console.log(accessToken);

  redirect('/mfa/kodlar');
}

export async function mfaLoginAction(_prevState: MfaComplateActionState, formData: FormData): Promise<MfaComplateActionState> {
  const validatedData = validateFormData(mfaComplateSchema,formData);

  if (!validatedData.success) {
    return {
      success: false,
      message: 'Lütfen kodu kontrol ediniz.',
    }
  }

  const challengeToken = await getMfaChallengeCookie();
  
  const body = {
    challengeToken: challengeToken,
    totpCode: validatedData.data.code,
    recoveryCode: null,
  }

  const response = await routeApi<LoginResponse>({
    endpoint: "/api/auth/mfa/login",
    method: "POST",
    body: body,
  });

  if (!response.success) {
    return {
      success: false,
      message: 'MFA doğrulama kodu geçersiz.',
    }
  }
  const user = response.data.user;
  if(!user.isActive) {
    return {
      success: false,
      message: "Hesabınız aktif değil. Lütfen destek ile iletişime geçiniz.",
    }
  }

  const tokens = response.data.tokens;
  await setAuthCookies({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    accessTokenExpiresAtUtc: tokens.accessTokenExpiresAtUtc,
    refreshTokenExpiresAtUtc: tokens.refreshTokenExpiresAtUtc,
  });
  await clearMfaChallengeCookie();
  redirect('/');
}