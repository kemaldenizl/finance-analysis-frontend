import type { CategorySummaryItem } from "@/src/features/analysis/ai-analysis/types/analysis.types";

type CategorySummaryProps = {
  summary?: CategorySummaryItem[];
};

export default function CategorySummary({ summary }: CategorySummaryProps) {
  const items = summary ?? [];

  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Kategoriler</h2>
        {items.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-black/10 bg-background p-4 text-sm text-slate-600 dark:border-white/15 dark:text-slate-300">
            Kategori özeti bulunamadı.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.category}
                className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
              >
                <p className="text-sm font-semibold">{item.category}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  İşlem Sayısı: {item.transaction_count}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Toplam Ödeme: {item.total_amount.toFixed(2)} TRY
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Harcamanın payı: %{(item.share_of_spend * 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
