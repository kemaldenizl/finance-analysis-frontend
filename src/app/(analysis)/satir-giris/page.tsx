"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useActionState } from "react";
import { ExtractedDataResponse, Transaction } from "@/src/features/analysis/ai-upload/types/upload.types";
import { EXTRACT_RESULT_STORAGE_KEY } from "@/src/features/analysis/ai-upload";
import { AnalysisActionState } from "@/src/features/analysis/ai-analysis/types/analysis.types";
import { ANALYSIS_RESULT_STORAGE_KEY } from "@/src/features/analysis/ai-analysis";
import { startAnalysisAction } from "@/src/features/analysis/ai-analysis/actions";

type TransactionDirection = "debit" | "credit";

const initialState: AnalysisActionState = {
  success: false,
};

type TransactionFormRow = {
  transaction_id: string;
  date: string;
  description: string;
  merchant: NormalizedMerchant;
  amount: string;
  currency: string;
  direction: TransactionDirection;
  installment: TransactionInstallment;
};

type TransactionInstallment = {
  current: number | null;
  raw: string | null;
  total: number | null;
  total_amount: number | null;
  unit_amount: number | null;
};

type NormalizedMerchant = {
  normalized: string;
}

type PurchaseScenario = {
  amount: number;
  currency: string;
  max_installment_months: number;
};

function createEmptyRow(): TransactionFormRow {
  return {
    transaction_id: `txn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    date: "",
    description: "",
    merchant: {
      normalized: "",
    },
    amount: "",
    currency: "TRY",
    direction: "debit",
    installment: {
      current: null,
      raw: null,
      total: null,
      total_amount: null,
      unit_amount: null,
    },
  };
}

function createFullRow(transaction: Transaction): TransactionFormRow {
  return {
    transaction_id: transaction.transaction_id,
    date: transaction.date ?? "",
    description: transaction.description ?? "",
    merchant: {
      normalized: transaction.merchant.normalized ?? "",
    },
    amount: transaction.amount?.toString() ?? "",
    currency: transaction.original_currency ?? "TRY",
    direction: transaction.direction ?? "debit",
    installment: {
      current: transaction.installment.current ?? null,
      raw: transaction.installment.raw ?? null,
      total: transaction.installment.total ?? null,
      total_amount: transaction.installment.total_amount ?? null,
      unit_amount: transaction.installment.unit_amount ?? null,
    },
  }
}

function hasInstallmentData(installment: TransactionInstallment): boolean {
  return (
    installment.current !== null ||
    installment.total !== null ||
    installment.total_amount !== null ||
    installment.unit_amount !== null ||
    (installment.raw !== null && installment.raw.trim() !== "")
  );
}

export default function SatirGirisPage() {
  const router = useRouter();
  const [rows, setRows] = useState<TransactionFormRow[]>([createEmptyRow()]);
  const [openInstallments, setOpenInstallments] = useState<Set<string>>(new Set());
  const [purchaseScenario, setPurchaseScenario] = useState<PurchaseScenario>({
    amount: 1000,
    currency: "TRY",
    max_installment_months: 12,
  });

  const addNewRow = () => {
    setRows((prev) => [...prev, createEmptyRow()]);
  };

  const toggleInstallment = (id: string) => {
    setOpenInstallments((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const updateInstallment = (
    id: string,
    field: keyof TransactionInstallment,
    value: string,
  ) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.transaction_id !== id) {
          return row;
        }

        const trimmed = value.trim();
        const nextValue =
          field === "raw"
            ? trimmed === ""
              ? null
              : value
            : trimmed === ""
              ? null
              : Number(trimmed);

        return {
          ...row,
          installment: { ...row.installment, [field]: nextValue },
        };
      }),
    );
  };

  const removeRow = (id: string) => {
    setRows((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((row) => row.transaction_id !== id);
    });
    setOpenInstallments((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const updateRow = (
    id: string,
    field: keyof Omit<TransactionFormRow, "transaction_id">,
    value: string,
  ) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.transaction_id !== id) {
          return row;
        }

        if (field === "merchant") {
          return { ...row, merchant: { ...row.merchant, normalized: value } };
        }

        return { ...row, [field]: value };
      }),
    );
  };

  useEffect(() => {
    const raw = sessionStorage.getItem(EXTRACT_RESULT_STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw) as ExtractedDataResponse;
      const transactions = data.response.result.transactions;
      if (transactions && transactions.length > 0) {
        const nextRows = transactions.map(createFullRow);
        setRows(nextRows);
        setOpenInstallments(
          new Set(
            nextRows
              .filter((row) => hasInstallmentData(row.installment))
              .map((row) => row.transaction_id),
          ),
        );
      }
    }
  }, []);

  const [state, formAction, isPending] = useActionState(startAnalysisAction, initialState);

  useEffect(() => {
    if (state.success && state.data) {
      sessionStorage.setItem(
        ANALYSIS_RESULT_STORAGE_KEY,
        JSON.stringify(state.data),
      );
      router.push("/ai-analysis");
    }
  }, [state, router]);

  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-14 top-20 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-fuchsia-500/20 blur-3xl dark:bg-fuchsia-400/10" />
      </div>

      <section className="w-full max-w-5xl rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
            Satır Satır Transaction Girişi
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {rows.length > 0 ? "İşlem Verileri Başarıyla Yüklendi" : "İşlem Verilerini Elle Gir"}
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {
              rows.length > 0 ? "Verileri düzenleyebilir kontrol edebilirsiniz." : 
              "Yapay zekanın analiz etmesini istediğiniz bilgilerinizi sırayla girebilirsiniz."
            }
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-900 dark:text-cyan-100">
          Şu an toplam <span className="font-semibold">{rows.length}</span>{" "}
          harcama satırı bulunuyor.
        </div>
        <form action={formAction} className="space-y-4">
        <input type="hidden" name="transactions" value={JSON.stringify(rows)} />
        <input type="hidden" name="purchase_scenario" value={JSON.stringify(purchaseScenario)} />
        <div className="space-y-4">
          {rows.map((row, index) => (
            <article
              key={row.transaction_id}
              className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold">
                    Harcama {index + 1}
                  </h2>
                  {hasInstallmentData(row.installment) && (
                    <span className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-[11px] font-semibold text-violet-700 dark:text-violet-300">
                      Taksitli
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleInstallment(row.transaction_id)}
                    aria-expanded={openInstallments.has(row.transaction_id)}
                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 text-xs font-semibold text-violet-700 transition hover:bg-violet-500/20 dark:text-violet-300 cursor-pointer"
                    title="Taksit bilgisi gir"
                  >
                    <span
                      className={`transition-transform duration-200 ${
                        openInstallments.has(row.transaction_id) ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    >
                      ▾
                    </span>
                    {openInstallments.has(row.transaction_id)
                      ? "Taksiti Gizle"
                      : "Taksit Girişi Yap"}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeRow(row.transaction_id)}
                    disabled={rows.length === 1}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-sm font-bold text-rose-700 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-40 dark:text-rose-300 cursor-pointer"
                    aria-label={`Transaction ${index + 1} sil`}
                    title="Bu satırı sil"
                  >
                    X
                  </button>
                </div>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <label className="space-y-1.5">
                  <span className="text-xs font-medium">Tarih</span>
                  <input
                    type="date"
                    value={row.date}
                    onChange={(event) =>
                      updateRow(row.transaction_id, "date", event.target.value)
                    }
                    className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-medium">Açıklama</span>
                  <input
                    type="text"
                    placeholder="Açıklama"
                    value={row.description}
                    onChange={(event) =>
                      updateRow(row.transaction_id, "description", event.target.value)
                    }
                    className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-medium">Satıcı</span>
                  <input
                    type="text"
                    placeholder="Satıcı bilgileri"
                    value={row.merchant.normalized}
                    onChange={(event) =>
                      updateRow(row.transaction_id, "merchant", event.target.value)
                    }
                    className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-medium">Tutar</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="370.99"
                    value={row.amount}
                    onChange={(event) =>
                      updateRow(row.transaction_id, "amount", event.target.value)
                    }
                    className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-medium">Para Birimi</span>
                  <input
                    type="text"
                    placeholder="TRY"
                    value={row.currency}
                    onChange={(event) =>
                      updateRow(row.transaction_id, "currency", event.target.value)
                    }
                    className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm uppercase outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-medium">Yön</span>
                  <select
                    value={row.direction}
                    onChange={(event) =>
                      updateRow(
                        row.transaction_id,
                        "direction",
                        event.target.value as TransactionDirection,
                      )
                    }
                    className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5"
                  >
                    <option value="debit">debit (harcama)</option>
                    <option value="credit">credit (gelir)</option>
                  </select>
                </label>
              </div>

              {openInstallments.has(row.transaction_id) && (
                <div className="mt-4 rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 dark:border-violet-400/20 dark:bg-violet-400/5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300">
                      ₺
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-violet-900 dark:text-violet-100">
                        Taksit Bilgileri
                      </h3>
                      <p className="text-xs text-violet-700/80 dark:text-violet-300/80">
                        Bu harcama taksitli ise taksit detaylarını girin.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                    <label className="space-y-1.5">
                      <span className="text-xs font-medium">Mevcut Taksit Dönemi</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="Mevcut Taksit Dönemi"
                        value={row.installment.current ?? ""}
                        onChange={(event) =>
                          updateInstallment(
                            row.transaction_id,
                            "current",
                            event.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/5"
                      />
                    </label>

                    <label className="space-y-1.5">
                      <span className="text-xs font-medium">Toplam Taksit Sayısı</span>
                      <input
                        type="number"
                        min="0"
                        placeholder="Toplam Taksit Sayısı"
                        value={row.installment.total ?? ""}
                        onChange={(event) =>
                          updateInstallment(
                            row.transaction_id,
                            "total",
                            event.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/5"
                      />
                    </label>

                    <label className="space-y-1.5">
                      <span className="text-xs font-medium">Aylık Taksit Tutarı</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Aylık Taksit Tutarı"
                        value={row.installment.unit_amount ?? ""}
                        onChange={(event) =>
                          updateInstallment(
                            row.transaction_id,
                            "unit_amount",
                            event.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/5"
                      />
                    </label>

                    <label className="space-y-1.5">
                      <span className="text-xs font-medium">Toplam Tutar</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Toplam Tutar"
                        value={row.installment.total_amount ?? ""}
                        onChange={(event) =>
                          updateInstallment(
                            row.transaction_id,
                            "total_amount",
                            event.target.value,
                          )
                        }
                        className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15 dark:bg-white/5"
                      />
                    </label>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
        <div className="space-y-4">
          <article className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15" >
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold">
                  Taksitli Ürün Alım Tavsiyesi
                </h2>
              </div>
              <p className="text-xs">Yapay Zeka girdiğin senaryoya göre aylık ödeme planı oluşturur.</p>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <label className="space-y-1.5">
                <span className="text-xs font-medium">Toplam Fiyat</span>
                <input
                  type="number"
                  placeholder="Toplam Fiyat"
                  value={purchaseScenario.amount}
                  onChange={(event) =>
                    setPurchaseScenario({ ...purchaseScenario, amount: Number(event.target.value) })
                  }
                  className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5"
                />
              </label>

              <label className="space-y-1.5">
                <span className="text-xs font-medium">Para Birimi</span>
                <input
                  type="text"
                  placeholder="Para Birimi"
                  value={purchaseScenario.currency}
                  onChange={(event) =>
                    setPurchaseScenario({ ...purchaseScenario, currency: event.target.value })
                  }
                  className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5"
                />
              </label>

              <label className="space-y-1.5">
                <span className="text-xs font-medium">Maksimum Taksit Ay Sayısı</span>
                <input
                  type="number"
                  placeholder="Maksimum Taksit Ay Sayısı"
                  value={purchaseScenario.max_installment_months}
                  onChange={(event) =>
                    setPurchaseScenario({ ...purchaseScenario, max_installment_months: Number(event.target.value) })
                  }
                  className="w-full rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15 dark:bg-white/5"
                />
              </label>
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={addNewRow}
            className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-800 transition hover:bg-cyan-500/20 dark:text-cyan-200 cursor-pointer"
          >
            Yeni Satır Aç
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Analiz Başlatılıyor..." : "Analize Başla"}
          </button>
          <Link
            href="/ai-basla"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-background px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
          >
            Geri Dön
          </Link>
        </div>
        </form>
      </section>
    </div>
  );
}
