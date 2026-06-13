import type { AnomalyResult } from "@/src/features/analysis/ai-analysis/types/analysis.types";

type AnomalyAiCommentProps = {
  anomalies?: AnomalyResult;
};

export default function AnomalyAiComment({ anomalies }: AnomalyAiCommentProps) {
  const items = anomalies?.items ?? [];

  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Anomali ve AI Yorumu</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Tespit edilen anomali sayisi: {anomalies?.anomaly_count ?? 0}
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {items.length === 0 ? (
            <p className="rounded-2xl border border-black/10 bg-background p-4 text-sm text-slate-600 dark:border-white/15 dark:text-slate-300">
              Anomali sinyali bulunamadı.
            </p>
          ) : (
            items.map((item, index) => (
              <div
                key={item.transaction_id ?? index}
                className="rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4"
              >
                <p className="text-sm font-semibold text-rose-900 dark:text-rose-100">
                  {item.message.split(": ")[1].split(".")[0]}
                </p>
                <p className="mt-1 text-xs text-rose-900 dark:text-rose-100">
                  {item.merchant} 
                </p>
                <br />
                <p className="mt-2 text-xs text-rose-900 dark:text-rose-100">
                  Tutar: {item.amount?.toFixed?.(2) ?? item.amount} {item.currency}{" "}
                  | Seviye: {item.severity === "high" ? "Yüksek" : item.severity === "medium" ? "Orta" : "Düşük"} | Skor: {(item.score * 100).toFixed(2)}%
                </p>
              </div>
            ))
          )}
        </div>
        {anomalies?.llm_explanation ? (
            <div className="mt-4 whitespace-pre-line rounded-2xl border border-black/10 bg-background p-4 text-sm text-slate-700 dark:border-white/15 dark:text-slate-200">
              {anomalies.llm_explanation}
            </div>
          ) : null}
      </article>
    </>
  );
}
