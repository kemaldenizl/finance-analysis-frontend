import Link from "next/link";

const featureCards = [
  {
    title: "Akıllı Harcama Analizi",
    description:
      "AI modeli hareketlerini kategorilere ayırır ve harcama eğilimlerini kısa sürede görünür hale getirir.",
  },
  {
    title: "Risk ve Anomali Tespiti",
    description:
      "Beklenmeyen artışları, tekrar eden masrafları ve olağan dışı işlem desenlerini hızlıca öne çıkarır.",
  },
  {
    title: "Özet ve Öneriler",
    description:
      "Aylık finans görünümünü sade bir dille özetler, bütçeni iyileştirmek için uygulanabilir öneriler sunar.",
  },
];

export default function AiBaslaPage() {
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-14 top-20 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-fuchsia-500/20 blur-3xl dark:bg-fuchsia-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <section className="w-full max-w-3xl rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-300">
            AI Analiz Başlangıcı
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Finans Verilerini AI ile Yorumla
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            İşlem verilerini sisteme ekleyerek harcama kalıplarını, anomali
            olasılıklarını ve finansal içgörüleri tek ekranda inceleyebilirsin.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
            >
              <h2 className="text-sm font-semibold">{feature.title}</h2>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 p-4 text-sm text-fuchsia-900 dark:text-fuchsia-100">
          İşlem giriş yöntemini seçerek analiz sürecini başlatabilirsin.
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/dosya-yukle"
            className="inline-flex items-center justify-center rounded-xl bg-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-fuchsia-500"
          >
            Dosya Yükleyerek Devam Et
          </Link>
          <Link
            href="/satir-giris"
            className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-background px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
          >
            Elle Giriş Yaparak Devam Et
          </Link>
        </div>
      </section>
    </div>
  );
}
