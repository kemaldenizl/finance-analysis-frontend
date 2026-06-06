import Link from "next/link";

const aiCapabilities = [
  {
    badge: "%94+ doğruluk",
    title: "Akıllı Kategorilendirme",
    description:
      "Ekstre satırlarını otomatik olarak kategorilere ayırır, yinelenen ve abonelik tipi işlemleri tanır. Her kategori için işlem sayısı, toplam tutar ve harcama payını çıkarır.",
  },
  {
    badge: "PyOD outlier skoru",
    title: "Anomali Tespiti",
    description:
      "Normal harcama davranışından sapan işlemleri istatistiksel olarak yakalar. Her sinyal için severity (düşük/orta/yüksek) ve risk skoru üretir, riskli işlemleri öne çıkarır.",
  },
  {
    badge: "Baseline + projeksiyon",
    title: "Harcama Tahmini",
    description:
      "Geçmiş hareketlerinden aylık baseline harcamanı hesaplar ve ay sonu nakit çıkışını öngörür. Limit aşımı olasılıklarında erken uyarı verir.",
  },
  {
    badge: "Burden ratio analizi",
    title: "Taksit Risk Analizi",
    description:
      "Talep edilen tutarı baseline harcamanla kıyaslayıp farklı vade seçenekleri için aylık yük oranını (burden ratio) ve risk seviyesini hesaplar.",
  },
  {
    badge: "Güven skoru 0–1",
    title: "Kalite ve Güven Metrikleri",
    description:
      "Analizin ne kadar güvenilir olduğunu ölçer; geçerli, düşük güvenli ve geçersiz işlem sayılarıyla genel güven skorunu raporlar.",
  },
  {
    badge: "Doğal dil",
    title: "AI Sohbet Asistanı",
    description:
      "Analiz sonuçlarını sohbet botuyla sorgula: kategori dağılımı, anomaliler, gelecek ay tahmini ve taksit önerileri hakkında anında yanıt al.",
  },
];

const aiWorkflow = [
  {
    step: "1",
    title: "Ekstreni Ekle",
    description: "Dosya yükle ya da işlemleri elle gir; sistem veriyi temizleyip hazırlasın.",
  },
  {
    step: "2",
    title: "AI Analizini Başlat",
    description: "Kategori, anomali, tahmin ve taksit modelleri otomatik olarak çalışsın.",
  },
  {
    step: "3",
    title: "Sonuçları Sorgula",
    description: "Görselleştirilmiş içgörüleri incele ve chatbot ile detaylara in.",
  },
];

export function AISection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10">
        <span className="inline-flex items-center rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-300">
          AI Analiz Merkezi
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
          Finans verilerin yapay zeka ile uçtan uca analiz ediliyor
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-700 dark:text-slate-300 md:text-base">
          Ekstrelerini yükledikten sonra sistem; işlemlerini kategorilere ayırır,
          olağan dışı harcamaları tespit eder, ay sonu nakit akışını tahmin eder ve
          taksit senaryolarını risk açısından değerlendirir. Tüm bu sonuçları
          görsel panellerde ve AI sohbet asistanıyla inceleyebilirsin.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiCapabilities.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-black/10 bg-white/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-700 dark:text-fuchsia-300">
                {item.badge}
              </p>
              <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <h3 className="text-xl font-semibold">Analiz nasıl çalışır?</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {aiWorkflow.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fuchsia-600 text-sm font-bold text-white shadow-sm">
                    {item.step}
                  </span>
                  <p className="font-semibold">{item.title}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/70 shadow-sm dark:border-white/10 dark:bg-white/5 mt-6 p-6 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Ekstreni ekle, analizi saniyeler içinde başlat.
          </p>
          <Link
            href="/ai-basla"
            className="px-6 py-3 group inline-flex items-center justify-center gap-2 rounded-full bg-fuchsia-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/25 transition hover:bg-fuchsia-500 hover:shadow-fuchsia-500/40"
          >
            AI Analizini Başlat
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
