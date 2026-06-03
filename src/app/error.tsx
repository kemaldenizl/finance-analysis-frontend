"use client";

import Link from "next/link";

type RootErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function RootErrorPage({ error, reset }: RootErrorPageProps) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center rounded-3xl border border-rose-500/20 bg-rose-50/70 p-8 text-center shadow-lg dark:border-rose-400/30 dark:bg-rose-950/20">
      <p className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-700 dark:text-rose-300">
        Beklenmeyen Hata
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        İşlem sırasında bir sorun oluştu
      </h1>
      <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
        Finans verileri işlenirken teknik bir problem yaşandı. Tekrar denemeyi
        seçebilir veya ana sayfaya dönebilirsin.
      </p>
      {error.digest ? (
        <p className="mt-3 rounded-lg bg-black/5 px-3 py-2 font-mono text-xs text-slate-600 dark:bg-white/10 dark:text-slate-300">
          Hata kodu: {error.digest}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className="rounded-xl border border-black/15 bg-white/70 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-black/25 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/30"
        >
          Ana Sayfaya Git
        </Link>
      </div>
    </section>
  );
}