const engineMeta = [
  { label: "Analysis Version", value: "ai-analysis-v2" },
  { label: "LLM Model", value: "qwen2.5:1.5b" },
  { label: "Embedding Model", value: "paraphrase-multilingual-MiniLM-L12-v2" },
  { label: "Forecast Method", value: "pytorch_transformer_encoder_v1" },
  { label: "Anomaly Method", value: "pyod_ecod_v1" },
];

export default function EngineInfo() {
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
              <p className="mt-1 font-medium">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-100">
          Warning: recommendation_is_spending_burden_estimate_not_credit_advice
        </div>
      </article>
    </>
  );
}
