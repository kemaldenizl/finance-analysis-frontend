import type { CategorySummaryItem } from "@/src/features/analysis/ai-analysis/types/analysis.types";
import CategoryCircleChart from "@/src/features/analysis/ai-analysis/components/category-circle-chart";

type CategorySummaryProps = {
  summary?: CategorySummaryItem[];
};

export default function CategorySummary({ summary }: CategorySummaryProps) {
  const items = summary ?? [];

  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Kategoriler</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Analiz sonucu harcamalar kategorilere ayrılmıştır.
        </p>
        {items.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-black/10 bg-background p-4 text-sm text-slate-600 dark:border-white/15 dark:text-slate-300">
            Kategori özeti bulunamadı.
          </p>
        ) : (
          <CategoryCircleChart categories={items} />
        )}
        
      </article>
    </>
  );
}
