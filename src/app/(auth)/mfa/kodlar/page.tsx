import Link from "next/link";
import { getRecoveryCodesFromCookie } from "@/src/shared/lib/auth/recovery-codes-cookie";
import { redirect } from "next/navigation";

const safetyNotes = [
  {
    title: "Kodları Güvenli Sakla",
    description:
      "Recovery kodlarını parola yöneticisinde veya fiziksel olarak güvenli bir yerde tut.",
  },
  {
    title: "Tek Kullanımlıktır",
    description:
      "Her recovery kodu yalnızca bir kez kullanılabilir; kullanıldıktan sonra geçersiz olur.",
  },
  {
    title: "Kimseyle Paylaşma",
    description:
      "Bu kodlara sahip olan herkes hesabına erişim sağlayabilir. Üçüncü kişilerle paylaşma.",
  },
];

export default async function MfaRecoveryCodesPage() {

  const recoveryCodes = await getRecoveryCodesFromCookie();
  if(!recoveryCodes) {
    redirect('/mfa/kurulum');
  }

  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-1">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-16 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-emerald-500/20 blur-3xl dark:bg-emerald-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <section className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            Kurtarma Kodları Hazır
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Recovery Kodlarını Kaydet</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            MFA kurulumu başarılı. Telefonuna erişemediğin durumlarda aşağıdaki
            kodlarla hesabına giriş yapabilirsin.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {safetyNotes.map((note) => (
            <article
              key={note.title}
              className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
            >
              <h2 className="text-sm font-semibold">{note.title}</h2>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                {note.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
            Recovery Kodları
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {recoveryCodes.map((code) => (
              <div
                key={code}
                className="rounded-lg border border-emerald-500/20 bg-white/70 px-3 py-2 text-center font-mono text-sm font-semibold tracking-wider text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100"
              >
                {code}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
          >
            Tamam, Devam Et
          </Link>
        </div>
      </section>
    </div>
  );
}
