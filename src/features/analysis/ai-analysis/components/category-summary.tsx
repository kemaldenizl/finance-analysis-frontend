const categorySummary = [
  {
    category: "travel",
    transactionCount: 1,
    totalAmount: 1200.0,
    share: 0.7273,
  },
  { category: "other", transactionCount: 1, totalAmount: 450.0, share: 0.2727 },
];

export default function CategorySummary() {
  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Kategori Ozeti</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {categorySummary.map((item) => (
            <div
              key={item.category}
              className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
            >
              <p className="text-sm font-semibold">{item.category}</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Islem sayisi: {item.transactionCount}
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Toplam: {item.totalAmount.toFixed(2)} TRY
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Harcama payi: %{(item.share * 100).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}
