import Link from "next/link";

const supportedFiles = [
  {
    title: "Ekran Görüntüsü",
    description:
      "Banka uygulaması veya internet bankacılığı ekranından alınmış işlem görüntülerini yükleyebilirsin.",
  },
  {
    title: "Döküman Fotoğrafı",
    description:
      "Ekstre ya da işlem dökümanının telefonla çekilmiş fotoğrafını sisteme ekleyebilirsin.",
  },
  {
    title: "Taratılmış Döküman (PDF)",
    description:
      "Fiziksel dökümanları tarayıp PDF olarak kaydederek analiz için yükleyebilirsin.",
  },
  {
    title: "Gerçek PDF",
    description:
      "Bankadan indirilen dijital ekstre veya işlem raporlarını doğrudan PDF olarak gönderebilirsin.",
  },
];

export default function DosyaYuklePage() {
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-14 top-20 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-400/10" />
      </div>

      <section className="w-full max-w-3xl rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
            Dosya Yükleme
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            İşlem Dökümanını Yükle
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Analize başlamak için dosyanı seç. Farklı kaynaklardan gelen işlem
            dökümanlarını bu ekrandan sisteme ekleyebilirsin.
          </p>
        </div>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-500/40 bg-cyan-500/5 px-6 py-10 text-center transition hover:bg-cyan-500/10">
          <span className="text-sm font-semibold text-cyan-800 dark:text-cyan-200">
            Dosya Seç veya Sürükle-Bırak
          </span>
          <span className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            PNG, JPG, JPEG ve PDF formatları desteklenir.
          </span>
          <input type="file" className="sr-only" />
        </label>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {supportedFiles.map((fileType) => (
            <article
              key={fileType.title}
              className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
            >
              <h2 className="text-sm font-semibold">{fileType.title}</h2>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                {fileType.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
          >
            Dosyayı Yükle
          </button>
          <Link
            href="/ai-basla"
            className="inline-flex w-full items-center justify-center rounded-xl border border-black/10 bg-background px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
          >
            Geri Dön
          </Link>
        </div>
      </section>
    </div>
  );
}
