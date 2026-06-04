import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-16 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300">
            Yeni Şifre
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Şifremi Sıfırla</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Hesabın için yeni bir şifre belirle ve güvenli şekilde giriş yapmaya
            devam et.
          </p>
        </div>

        <form className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium">Yeni Şifre</span>
            <input
              type="password"
              name="newPassword"
              placeholder="Yeni şifreni gir"
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 cursor-pointer"
          >
            Onayla
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
          Giriş ekranına dönmek için{" "}
          <Link href="/giris-yap" className="font-semibold text-violet-700 dark:text-violet-300">
            tıkla
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
