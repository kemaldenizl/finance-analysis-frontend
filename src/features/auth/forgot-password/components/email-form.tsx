"use client";

import { useActionState } from "react";
import { forgotPasswordAction, ForgotPasswordActionState } from "@/src/features/auth/forgot-password/actions";

const initialState: ForgotPasswordActionState = {
  success: false,
};
  
export default function EmailForm() {
  const [state, formAction] = useActionState(forgotPasswordAction, initialState);
  return (
    <>
      <form className="space-y-4" action={formAction}>
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
        <p className="text-sm text-blue-400">{state.message}</p>
      </form>
    </>
  );
}
