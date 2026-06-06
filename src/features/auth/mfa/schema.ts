import { z } from "zod";

export const mfaComplateSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "6 haneli doğrulama kodu giriniz"),
});

export type MfaComplateSchema = z.infer<typeof mfaComplateSchema>;