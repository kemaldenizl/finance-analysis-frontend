import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email("Geçerli bir email adresi gir.")
    .min(1, "Email boş bırakılamaz.")
    .max(320, "Email en fazla 255 karakter olabilir."),

  password: z
    .string()
    .min(12, "Şifre en az 12 karakter olmalı.")
    .max(200, "Şifre en fazla 200 karakter olabilir.")
    .regex(/[A-Z]/, "Şifre en az bir adet büyük harf içermeli.")
    .regex(/[a-z]/, "Şifre en az bir adet küçük harf içermeli.")
    .regex(/[0-9]/, "Şifre en az bir adet sayı içermeli.")
    .regex(/[^a-zA-Z0-9]/, "Şifre en az bir adet özel karakter içermeli."),
});

export type RegisterSchema = z.infer<typeof registerSchema>;