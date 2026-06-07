import type { InstallmentRecommendation } from "@/src/features/analysis/ai-analysis/types/analysis.types";

type InstallmentOptionsProps = {
  recommendation?: InstallmentRecommendation;
};

export default function InstallmentOptions({
  recommendation,
}: InstallmentOptionsProps) {
  const options = recommendation?.options ?? [];
  const currency = recommendation?.currency ?? "TRY";

  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Taksit Onerileri</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Talep edilen tutar: {recommendation?.requested_amount ?? "-"} {currency}{" "}
          | Baseline aylik harcama:{" "}
          {recommendation?.baseline_monthly_spend?.toFixed?.(2) ?? "-"} {currency}
        </p>
        {options.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-black/10 bg-background p-4 text-sm text-slate-600 dark:border-white/15 dark:text-slate-300">
            Taksit önerisi bulunamadı.
          </p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((option) => (
              <div
                key={option.months}
                className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
              >
                <p className="text-sm font-semibold">{option.months} ay</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Aylik odeme: {option.monthly_amount.toFixed(2)} {currency}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Burden ratio: {option.monthly_burden_ratio}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-200">
                  Risk: {option.risk_level}
                </p>
              </div>
            ))}
          </div>
        )}
      </article>
    </>
  );
}
