const installmentOptions = [
  {
    months: 1,
    monthlyAmount: 6000,
    monthlyBurdenRatio: 1.4031,
    riskLevel: "high",
  },
  {
    months: 2,
    monthlyAmount: 3000,
    monthlyBurdenRatio: 0.7016,
    riskLevel: "high",
  },
  {
    months: 3,
    monthlyAmount: 2000,
    monthlyBurdenRatio: 0.4677,
    riskLevel: "high",
  },
  {
    months: 4,
    monthlyAmount: 1500,
    monthlyBurdenRatio: 0.3508,
    riskLevel: "high",
  },
  {
    months: 5,
    monthlyAmount: 1200,
    monthlyBurdenRatio: 0.2806,
    riskLevel: "medium",
  },
  {
    months: 6,
    monthlyAmount: 1000,
    monthlyBurdenRatio: 0.2339,
    riskLevel: "medium",
  },
  {
    months: 10,
    monthlyAmount: 600,
    monthlyBurdenRatio: 0.1403,
    riskLevel: "low",
  },
];

export default function InstallmentOptions() {
  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Taksit Onerileri</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Talep edilen tutar: 6000 TRY | Baseline aylik harcama: 4276.14 TRY
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {installmentOptions.map((option) => (
            <div
              key={option.months}
              className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
            >
              <p className="text-sm font-semibold">{option.months} ay</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Aylik odeme: {option.monthlyAmount.toFixed(2)} TRY
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Burden ratio: {option.monthlyBurdenRatio}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-200">
                Risk: {option.riskLevel}
              </p>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
