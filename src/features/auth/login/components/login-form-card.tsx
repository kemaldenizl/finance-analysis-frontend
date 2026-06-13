"use client";

import Link from "next/link";
import type { LoginField } from "@/src/features/auth/login/types/login.types";
import type { LoginActionState } from "@/src/features/auth/login/actions";
import { useActionState, useState } from "react";
import { loginAction } from "@/src/features/auth/login/actions";

const initialState: LoginActionState = {
  success: false,
};

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

  const [state, formAction] = useActionState(loginAction, initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

      <form className="space-y-4" action={formAction}>
        {loginFields.map((field) => (
          <div key={field.id} className="block space-y-2">
            <label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
            </label>
            <div className="relative">
              <input
                id={field.id}
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
          </div>
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
