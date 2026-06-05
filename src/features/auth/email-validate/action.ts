'use server';

import { routeApi } from "@/src/shared/lib/api/route-api";
import { SendAgainEmailVerificationResponse } from "@/src/features/auth/email-validate/types/email.types";
import { getPendingVerificationCookie } from "@/src/shared/lib/auth/pending-verification-cookie";

export type SendAgainEmailVerificationActionState = {
    success: boolean;
    message?: string;
    fieldError?: string;
}

export async function sendAgainEmailVerificationAction(_prevState: SendAgainEmailVerificationActionState, formData: FormData): Promise<SendAgainEmailVerificationActionState> {
    const pendingUser = await getPendingVerificationCookie();

    if(!pendingUser) {
        return {
            success: false,
            message: "Doğrulama oturumu bulunamadı.",
        }
    }
    console.log('user',pendingUser);
    
    const response = await routeApi<SendAgainEmailVerificationResponse>({
        endpoint: "/api/auth/email-verification/send-again",
        method: "POST",
        body: {
            email: pendingUser?.email,
        },
    });

    if(!response.success) {
        console.error(response.error);
        return {
          success: false,
          message: "Mail Gönderilirken Bir Hata Oluştu.",
        }
    }

    return {
        success: true,
        message: "Mail Başarıyla Gönderildi.",
    }
}