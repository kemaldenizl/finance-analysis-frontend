import { z } from "zod";

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Geçersiz veya eksik şifre sıfırlama bağlantısı."),

  newPassword: z
    .string()
    .min(12, "Şifre en az 12 karakter olmalı.")
    .max(200, "Şifre en fazla 200 karakter olabilir.")
    .regex(/[A-Z]/, "Şifre en az bir adet büyük harf içermeli.")
    .regex(/[a-z]/, "Şifre en az bir adet küçük harf içermeli.")
    .regex(/[0-9]/, "Şifre en az bir adet sayı içermeli.")
    .regex(/[^a-zA-Z0-9]/, "Şifre en az bir adet özel karakter içermeli."),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
