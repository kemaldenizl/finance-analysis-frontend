import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-cyan-100/80 via-white to-indigo-100/80 p-8 shadow-xl dark:border-white/10 dark:from-cyan-950/40 dark:via-slate-950 dark:to-indigo-950/40 md:p-12">
      <div className="absolute -right-16 -top-16 h-52 w-52 animate-[spin_20s_linear_infinite] rounded-full border border-cyan-400/30" />
      <div className="absolute -bottom-20 left-8 h-40 w-40 animate-[pulse_4s_ease-in-out_infinite] rounded-full bg-indigo-400/20 blur-2xl" />

      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          AI destekli finansal kontrol merkezi
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
          Ekstrelerini anlayan ve sana yön veren modern finans asistanı
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-700 dark:text-slate-300 md:text-base">
          Harcamalarını kategorilere ayır, profilini çıkart, anomali yakala ve
          ay sonunu tahmin et. Tüm bunları doğrudan sohbet botuyla tartış
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/giris-yap" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
            Hemen Ücretsiz Giriş Yap
          </Link>
        </div>
      </div>
    </section>
  );
}
