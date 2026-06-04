import Link from "next/link";

const fileDetails = [
  { label: "Dosya Adı", value: "ekstre-mayis-2026.pdf" },
  { label: "Dosya Türü", value: "PDF Dökümanı" },
  { label: "Dosya Boyutu", value: "2.4 MB" },
  { label: "Yüklenme Tarihi", value: "04.06.2026 18:28" },
];

const checks = [
  "Dosya başarıyla yüklendi",
  "Ön işleme tamamlandı",
  "Okunabilirlik kontrolü tamamlandı",
  "Görsel işleme ve metin çıkarımı için hazır",
];

export default function DosyaVerileriPage() {
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-1">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-14 top-20 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <section className="w-full max-w-3xl rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            Yüklenen Dosya
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Dosya ve Bilgi Önizlemesi</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Analiz öncesi dosya bilgilerini kontrol edebilir, ardından verileri
            çıkarma adımına geçebilirsin.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-indigo-500/40 bg-indigo-500/5 p-6">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">
                ekstre-mayis-2026.pdf
              </p>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                Dosya önizleme alanı
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {fileDetails.map((detail) => (
              <article
                key={detail.label}
                className="rounded-2xl border border-black/10 bg-background p-3 dark:border-white/15"
              >
                <p className="text-xs text-slate-500 dark:text-slate-400">{detail.label}</p>
                <p className="mt-1 text-sm font-semibold">{detail.value}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4">
          <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">
            Kontrol Durumu
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-indigo-900 dark:text-indigo-100">
            {checks.map((check) => (
              <li key={check}>• {check}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
          >
            Verileri Çıkar
          </button>
          <Link
            href="/dosya-yukle"
            className="inline-flex w-full items-center justify-center rounded-xl border border-black/10 bg-background px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
          >
            Dosya Yükleme Ekranına Dön
          </Link>
        </div>
      </section>
    </div>
  );
}
