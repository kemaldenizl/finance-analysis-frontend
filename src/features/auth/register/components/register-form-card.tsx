import Link from "next/link";
import type { RegisterField } from "@/src/features/auth/register/types/register.types";

const registerFields: RegisterField[] = [
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
    placeholder: "En az 8 karakter",
    autoComplete: "new-password",
  },
];

export function RegisterFormCard() {
  return (
    <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      <div className="mb-6">
        <p className="inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          Yeni Hesap
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Kayıt Ol</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Finans raporlarını, harcama tahminlerini ve AI destekli analiz ekranını
          kullanmak için hızlıca hesap oluştur.
        </p>
      </div>

      <form className="space-y-4">
        {registerFields.map((field) => (
          <label key={field.id} className="block space-y-2">
            <span className="text-sm font-medium">{field.label}</span>
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required
              className="w-full rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/15"
            />
          </label>
        ))}

        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 cursor-pointer"
        >
          Hesap Oluştur
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
        Zaten hesabın var mı?{" "}
        <Link href="/giris-yap" className="font-semibold text-emerald-700 dark:text-emerald-300">
          Giriş Yap
        </Link>
      </p>
    </section>
  );
}
