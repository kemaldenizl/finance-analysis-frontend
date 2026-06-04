const qualityStats = [
  { label: "Genel Güven", value: "0.93" },
  { label: "Geçerli Transaction", value: "2" },
  { label: "Düşük Güvenli Transaction", value: "0" },
  { label: "Geçersiz Transaction", value: "0" },
  { label: "Analiz Güven Skoru", value: "0.93" },
];

export default function QualityMetrics() {
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
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
