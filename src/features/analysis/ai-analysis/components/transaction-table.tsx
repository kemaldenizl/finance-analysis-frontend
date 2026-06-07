import type {
  CategorizedMerchant,
  CategorizedTransaction,
} from "@/src/features/analysis/ai-analysis/types/analysis.types";

type TransactionTableProps = {
  transactions?: CategorizedTransaction[];
};

function resolveMerchant(
  merchant: CategorizedMerchant | string | null | undefined,
): string {
  if (!merchant) {
    return "-";
  }
  if (typeof merchant === "string") {
    return merchant;
  }
  return merchant.display_name ?? merchant.normalized ?? merchant.raw ?? "-";
}

function formatAmount(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || amount === "") {
    return "-";
  }
  const value = typeof amount === "string" ? Number(amount) : amount;
  return Number.isFinite(value) ? value.toFixed(2) : String(amount);
}

export default function TransactionTable({
  transactions,
}: TransactionTableProps) {
  const items = transactions ?? [];

  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Transactionlar</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Kullanicinin analiz edilen islem kayitlari
        </p>
        <div className="mt-4 space-y-3">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-black/10 bg-background p-4 text-sm text-slate-600 dark:border-white/15 dark:text-slate-300">
              Gösterilecek transaction bulunamadı.
            </p>
          ) : (
            items.map((txn, index) => (
              <div
                key={txn.transaction_id ?? index}
                className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold">
                    {txn.description ?? "-"}
                  </p>
                  <p className="text-sm font-semibold">
                    {formatAmount(txn.amount)} {txn.currency ?? ""}
                  </p>
                </div>
                <div className="mt-2 grid gap-1 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                  <p>ID: {txn.transaction_id ?? "-"}</p>
                  <p>Tarih: {txn.date ?? "-"}</p>
                  <p>Merchant: {resolveMerchant(txn.merchant)}</p>
                  <p>Kategori: {txn.category ?? "-"}</p>
                  <p>
                    Confidence:{" "}
                    {txn.confidence ?? txn.category_confidence ?? "-"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </article>
    </>
  );
}
