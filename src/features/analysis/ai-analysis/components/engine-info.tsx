import type {
  EngineInfo as EngineInfoData,
  WarningCode,
} from "@/src/features/analysis/ai-analysis/types/analysis.types";

type EngineInfoProps = {
  engine?: EngineInfoData;
  warnings?: WarningCode[];
};

export default function EngineInfo({ engine, warnings }: EngineInfoProps) {
  const engineMeta = [
    { label: "Analysis Version", value: engine?.analysis_version },
    { label: "LLM Model", value: engine?.llm_model },
    { label: "Embedding Model", value: engine?.embedding_model },
    { label: "Forecast Method", value: engine?.forecast_method },
    { label: "Anomaly Method", value: engine?.anomaly_method },
  ];

  const warningList = warnings ?? [];

  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Engine Bilgileri</h2>
        <div className="mt-4 space-y-2">
          {engineMeta.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-black/10 bg-background px-3 py-2 text-xs dark:border-white/15"
            >
              <p className="text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="mt-1 font-medium">{item.value ?? "-"}</p>
            </div>
          ))}
        </div>
        {warningList.length > 0 ? (
          <div className="mt-4 space-y-2">
            {warningList.map((warning) => (
              <div
                key={warning}
                className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-100"
              >
                Warning: {warning}
              </div>
            ))}
          </div>
        ) : null}
      </article>
    </>
  );
}
