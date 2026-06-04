import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-16 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-400/10" />
      </div>

      <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
            Şifre Kurtarma
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Şifremi Unuttum</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Hesabına bağlı email adresini gir. Sana şifre yenileme bağlantısı
            göndereceğiz.
          </p>
        </div>

        <form className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium">E-posta</span>
            <input
              type="email"
              name="email"
              placeholder="ornek@mail.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
          >
            Doğrulama Linki Gönder
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
          Şifreni hatırladıysan{" "}
          <Link href="/giris-yap" className="font-semibold text-cyan-700 dark:text-cyan-300">
            giriş yap
          </Link>
          .
        </p>
      </section>
    </div>
  );
}