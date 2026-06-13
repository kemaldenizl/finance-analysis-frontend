import { z } from "zod";

const transactionSchema = z.object({
  transaction_id: z.string().min(1, "İşlem kimliği boş bırakılamaz."),
  date: z.string().min(1, "Tarih boş bırakılamaz."),
  description: z.string().min(1, "Açıklama boş bırakılamaz."),
  merchant: z.object({
    normalized: z.string().min(1, "Satıcı bilgisi boş bırakılamaz."),
  }),
  amount: z.coerce
    .number({ error: "Tutar sayısal bir değer olmalıdır." })
    .positive("Tutar 0'dan büyük olmalıdır."),
  currency: z
    .string()
    .min(1, "Para birimi boş bırakılamaz.")
    .max(3, "Para birimi en fazla 3 karakter olabilir."),
  direction: z.enum(["debit", "credit"], {
    error: "Yön debit veya credit olmalıdır.",
  }),
});

const purchaseScenarioSchema = z.object({
  amount: z
    .number({ error: "Toplam fiyat sayısal bir değer olmalıdır." })
    .positive("Toplam fiyat 0'dan büyük olmalıdır."),
  currency: z
    .string()
    .min(1, "Para birimi boş bırakılamaz.")
    .max(3, "Para birimi en fazla 3 karakter olabilir."),
  max_installment_months: z
    .number({ error: "Maksimum taksit ay sayısı sayısal bir değer olmalıdır." })
    .int("Maksimum taksit ay sayısı tam sayı olmalıdır.")
    .min(1, "Maksimum taksit ay sayısı en az 1 olmalıdır.")
    .max(36, "Maksimum taksit ay sayısı en fazla 36 olabilir."),
});

export const aiAnalysisSchema = z.object({
  transactions: z
    .array(transactionSchema)
    .min(1, "En az bir harcama satırı girmelisiniz."),
  purchase_scenario: purchaseScenarioSchema,
});

export type AiAnalysisSchema = z.infer<typeof aiAnalysisSchema>;
