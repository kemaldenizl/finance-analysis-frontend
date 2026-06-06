import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Geçerli bir email adresi gir.").min(1, "Email boş bırakılamaz.").max(320, "Email en fazla 320 karakter olabilir."),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;