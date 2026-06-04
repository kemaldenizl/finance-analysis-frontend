const anomalyItems = [
  {
    id: "txn_002",
    severity: "high",
    type: "pyod_outlier_score",
    message:
      "UNKNOWN GAMING STORE işleminde istatistiksel sapma sinyali tespit edildi.",
    amount: 450.0,
    currency: "TRY",
    score: 1.0,
  },
];

export default function AnomalyAiComment() {
  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Anomali ve AI Yorumu</h2>
        <div className="mt-4 space-y-3">
          {anomalyItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4"
            >
              <p className="text-sm font-semibold text-rose-900 dark:text-rose-100">
                {item.id} - {item.type}
              </p>
              <p className="mt-1 text-xs text-rose-900 dark:text-rose-100">
                {item.message}
              </p>
              <p className="mt-2 text-xs text-rose-900 dark:text-rose-100">
                Tutar: {item.amount.toFixed(2)} {item.currency} | Severity:{" "}
                {item.severity} | Score: {item.score}
              </p>
            </div>
          ))}
          <div className="rounded-2xl border border-black/10 bg-background p-4 text-sm text-slate-700 dark:border-white/15 dark:text-slate-200">
            "Bir UNKNOWN GAMING STORE islemi yuksek riskli sinyal tasidigi icin
            inceleme gerektirebilir."
          </div>
        </div>
      </article>
    </>
  );
}
