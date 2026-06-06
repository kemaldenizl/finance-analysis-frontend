import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Geçerli bir email adresi gir.")
    .min(1, "Email boş bırakılamaz.")
    .max(320, "Email en fazla 320 karakter olabilir."),

  password: z
    .string()
    .min(1, "Şifre boş bırakılamaz.")
    .max(200, "Şifre en fazla 200 karakter olabilir."),
});

export type LoginSchema = z.infer<typeof loginSchema>;