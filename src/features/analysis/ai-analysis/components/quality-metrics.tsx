import type { QualityInfo } from "@/src/features/analysis/ai-analysis/types/analysis.types";

type QualityMetricsProps = {
  quality?: QualityInfo;
};

export default function QualityMetrics({ quality }: QualityMetricsProps) {
  const qualityStats = [
    { label: "Genel Güven", value: quality?.source_overall_confidence },
    { label: "Geçerli Transaction", value: quality?.usable_transaction_count },
    {
      label: "Düşük Güvenli Transaction",
      value: quality?.low_confidence_transaction_count,
    },
    { label: "Geçersiz Transaction", value: quality?.invalid_transaction_count },
    { label: "Analiz Güven Skoru", value: quality?.analysis_confidence },
  ];

  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Kalite Metrikleri</h2>
        <div className="mt-4 space-y-2">
          {qualityStats.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-black/10 bg-background px-3 py-2 text-sm dark:border-white/15"
            >
              <span className="text-slate-600 dark:text-slate-300">
                {item.label}
              </span>
              <span className="font-semibold">
                {item.value ?? "-"}
              </span>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
