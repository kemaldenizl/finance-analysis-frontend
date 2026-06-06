import { routeApi } from "@/src/shared/lib/api/route-api";
import { validateFormData } from "@/src/shared/lib/validation/form-validation.ts";
import { ForgotPasswordDto, ForgotPasswordResponse } from "@/src/features/auth/forgot-password/types/forget.types";
import { forgotPasswordSchema } from "@/src/features/auth/forgot-password/schema";

export type ForgotPasswordActionState = {
    success: boolean;
    message?: string;
};

export async function forgotPasswordAction(_prevState: ForgotPasswordActionState, formData: FormData): Promise<ForgotPasswordActionState> {
    const validatedData = validateFormData(forgotPasswordSchema,formData);
    if (!validatedData.success) {
        return {
            success: false,
            message: "Lütfen form alanındaki bilgileri kontrol ediniz.",
        }
    }
    const response = await routeApi<ForgotPasswordResponse>({
        endpoint: "/api/auth/forgot-password",
        method: "POST",
        body: validatedData.data,
    });
    if (!response.success) {
        return {
            success: false,
            message: "Şifre yenileme linki gönderilirken bir hata oluştu.",
        }
    }
    return {
        success: true,
        message: "Şifre yenileme linki başarıyla gönderildi.",
    }
}