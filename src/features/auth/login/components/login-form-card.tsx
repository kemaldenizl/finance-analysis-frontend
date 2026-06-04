import Link from "next/link";
import type { LoginField } from "@/src/features/auth/login/types/login.types";

const loginFields: LoginField[] = [
  {
    id: "email",
    label: "E-posta",
    name: "email",
    type: "email",
    placeholder: "ornek@mail.com",
    autoComplete: "email",
  },
  {
    id: "password",
    label: "Sifre",
    name: "password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "current-password",
  },
];

export function LoginFormCard() {
  return (
    <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <div className="mb-6">
        <p className="inline-flex rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
          Güvenli Giriş
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Hesabına Giriş Yap</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Ekstre analizlerine, anomali bildirimlerine ve AI sohbet asistanına
          kaldığın yerden devam et.
        </p>
      </div>

      <form className="space-y-4">
        {loginFields.map((field) => (
          <label key={field.id} className="block space-y-2">
            <span className="text-sm font-medium">{field.label}</span>
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required
              className="w-full rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15"
            />
          </label>
        ))}

        <button
          type="submit"
          className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
        >
          Giriş Yap
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
        <Link href="/sifremi-unuttum" className="font-semibold text-cyan-700 dark:text-cyan-300">
          Şifremi Unuttum
        </Link>
      </p>
      <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
        Hesabın yok mu?{" "}
        <Link href="/kayit-ol" className="font-semibold text-cyan-700 dark:text-cyan-300">
          Kayıt Ol
        </Link>
      </p>
    </section>
  );
}
