import Link from "next/link";

export function FinalCtaSection() {
  return (
    <section className="mt-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/15 via-indigo-500/10 to-violet-500/15 p-7 md:mt-14 md:p-10">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Ekstreni yükle, 90 saniye içinde ilk AI raporunu gör
        </h2>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 md:text-base">
          Kayıt ol, 2 adımlı doğrulama ile hesabını güvenceye al ve sohbet botu
          ile finansal sorularına anında yanıt al.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/kayit-ol" className="rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500">
            Ücretsiz Hesap Oluştur
          </Link>
        </div>
      </div>
    </section>
  );
}
