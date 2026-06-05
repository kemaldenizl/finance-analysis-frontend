"use client";

import { useActionState } from "react";
import { mfaLoginAction, MfaComplateActionState } from "@/src/features/auth/mfa/actions";

const initialState: MfaComplateActionState = {
  success: false,
};


export function MfaLoginForm() {
  const [state, formAction] = useActionState(mfaLoginAction, initialState);
  return (
    <>
      <form className="space-y-4" action={formAction}>
        <label className="block space-y-2">
          <span className="text-sm font-medium">6 Haneli Kod</span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            name="code"
            className="w-full rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-center text-lg tracking-[0.3em] outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
        >
          Giriş Yap
        </button>
        <p className="text-sm text-red-400">{state.message}</p>
      </form>
    </>
  );
}
