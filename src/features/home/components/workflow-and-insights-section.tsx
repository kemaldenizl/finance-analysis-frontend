import {
  insightPoints,
  workflowSteps,
} from "@/src/features/home/components/home-content";

function trendLabel(trend: "up" | "down"): string {
  return trend === "up" ? "Yükseliş" : "Azalış";
}

export function WorkflowAndInsightsSection() {
  return (
    <section id="akillar" className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2">
      <div className="rounded-2xl border border-black/10 bg-white/75 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
        <h3 className="text-xl font-semibold">3 adımda analiz akışı</h3>
        <ol className="mt-4 space-y-4">
          {workflowSteps.map((step) => (
            <li key={step.title} className="relative pl-6">
              <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-cyan-500" />
              <p className="font-medium">{step.title}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-black/10 bg-slate-900 p-6 text-white shadow-xl dark:border-white/10">
        <h3 className="text-xl font-semibold">Canlı harcama görünümü</h3>
        <p className="mt-2 text-sm text-slate-200">
          Geçen aya göre değişimleri ve risk sinyallerini tek panelde takip et.
        </p>
        <div className="mt-5 space-y-3">
          {insightPoints.map((insight) => (
            <div
              key={insight.label}
              className="rounded-xl border border-white/15 bg-white/5 p-4"
            >
              <p className="text-xs text-slate-300">{insight.label}</p>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-lg font-semibold">{insight.value}</p>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    insight.trend === "up"
                      ? "bg-rose-500/20 text-rose-200"
                      : "bg-emerald-500/20 text-emerald-200"
                  }`}
                >
                  {trendLabel(insight.trend)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
