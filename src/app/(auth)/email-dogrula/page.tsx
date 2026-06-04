import Link from "next/link";

export default function EmailDogrulaPage() {
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-16 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-amber-500/20 blur-3xl dark:bg-amber-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            Email Doğrulama Gerekli
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Emailini Doğrulaman Gerekli</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Hesabını oluşturduktan sonra gönderdiğimiz doğrulama bağlantısını
            tıklayarak email adresini onaylaman gerekiyor.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
          Doğrulama mailini göremiyorsan spam klasörünü de kontrol edebilirsin.
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-400 cursor-pointer"
        >
          Doğrulama Linkini Tekrar Gönder
        </button>

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
          Email adresini doğruladıysan{" "}
          <Link href="/giris-yap" className="font-semibold text-amber-700 dark:text-amber-300">
            giriş yap
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
