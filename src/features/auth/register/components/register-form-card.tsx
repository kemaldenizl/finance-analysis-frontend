"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { registerAction, RegisterActionState } from "@/src/features/auth/register/actions";
import type { RegisterField } from "@/src/features/auth/register/types/register.types";
import SubmitButton from "@/src/shared/components/form/submit-button";

const initialState: RegisterActionState = {
  success: false,
};

const registerFields: RegisterField[] = [
  {
    id: "email",
    label: "E-posta",
    name: "email",
    type: "email",
    placeholder: "ornek@mail.com",
    autoComplete: "email",
    description: "",
  },
  {
    id: "password",
    label: "Şifre",
    name: "password",
    type: "password",
    placeholder: "********",
    autoComplete: "new-password",
    description: "En az 12 karakter oluşmalı ve en az bir büyük, bir küçük harf, bir sayı ve bir özel karakter içermeli.",
  },
];

export function RegisterFormCard() {

  const [state, formAction] = useActionState(registerAction, initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
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

      <form className="space-y-4" action={formAction}>
        {registerFields.map((field) => (
          <label key={field.id} className="block space-y-2">
            <span className="text-sm font-medium">{field.label}</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">{field.description}</p>
            <div className="relative">
              <input
                name={field.name}
                type={field.name === "password" ? (isPasswordVisible ? "text" : "password") : field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                required
                className={`w-full rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/15 ${
                  field.name === "password" ? "pr-10" : ""
                }`}
              />
              {field.name === "password" && (
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  aria-label={isPasswordVisible ? "Şifreyi gizle" : "Şifreyi göster"}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M2 2l20 20" />
                      <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                      <path d="M9.88 5.09A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8-1.02 2.88-3.05 5.1-5.56 6.38" />
                      <path d="M6.61 6.61C4.62 8.12 3.06 9.94 2 12c.69 1.93 1.83 3.62 3.27 4.96" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3.27-8 10-8 10 8 10 8-3.27 8-10 8-10-8-10-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              )}
            </div>
            {
              
              state.fieldErrors?.[field.name]?.map((error) => (
                <p key={error} className="text-xs text-red-500">{error}</p>
              ))
            }
          </label>
        ))}
        <p className="text-sm text-red-500">{state.message}</p>
        <SubmitButton label="Hesap Oluştur" />
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
