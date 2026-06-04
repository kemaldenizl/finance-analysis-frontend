const transactions = [
  {
    id: "txn_001",
    date: "2026-03-26",
    description: "PEGASUS - Flight Ticket",
    merchant: "PEGASUS",
    amount: 1200.0,
    currency: "TRY",
    category: "travel / flight_transport",
    confidence: 0.94,
  },
  {
    id: "txn_002",
    date: "2026-03-26",
    description: "UNKNOWN GAMING STORE",
    merchant: "UNKNOWN GAMING STORE",
    amount: 450.0,
    currency: "TRY",
    category: "other",
    confidence: 0.82,
  },
  {
    id: "txn_cfa348674e73947b",
    date: "2026-03-26",
    description: "TRENDYOL YEMEK",
    merchant: "TRENDYOL",
    amount: 370.99,
    currency: "TRY",
    category: "food_delivery",
    confidence: 0.98,
  },
];

export default function TransactionTable() {
  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Transactionlar</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Kullanicinin analiz edilen islem kayitlari
        </p>
        <div className="mt-4 space-y-3">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{txn.description}</p>
                <p className="text-sm font-semibold">
                    {txn.amount.toFixed(2)} {txn.currency}
                </p>
              </div>
              <div className="mt-2 grid gap-1 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-2">
                <p>ID: {txn.id}</p>
                <p>Tarih: {txn.date}</p>
                <p>Merchant: {txn.merchant}</p>
                <p>Kategori: {txn.category}</p>
                <p>Confidence: {txn.confidence}</p>
              </div>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}