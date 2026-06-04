import Link from "next/link";

export default function EmailVerificationPage() {
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-16 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-emerald-500/20 blur-3xl dark:bg-emerald-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            Doğrulama Tamamlandı
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Emailiniz Doğrulandı</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Hesabınız başarıyla doğrulandı. Güvenli şekilde giriş yapabilir ve
            finans analiz ekranlarını kullanmaya başlayabilirsiniz.
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200">
          Doğrulama bağlantısı geçerli ve hesap durumunuz aktif.
        </div>

        <div className="mt-6 space-y-3">
          <Link
            href="/giris-yap"
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Giriş Yap
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl border border-black/10 bg-background px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </section>
    </div>
  );
}