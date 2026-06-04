import Link from "next/link";

export default function RootNotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center rounded-3xl border border-black/10 bg-white/70 p-8 text-center shadow-lg dark:border-white/10 dark:bg-white/5">
      <p className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Aradığın sayfaya ulaşılamadı
      </h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
        Bağlantı değişmiş olabilir veya sayfa kaldırılmış olabilir. Ana sayfaya
        dönerek analize devam edebilirsin.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Ana Sayfaya Dön
      </Link>
    </section>
  );
}