"use client";

import { useActionState } from "react";
import { mfaComplateAction, MfaComplateActionState } from "@/src/features/auth/mfa/actions";

const initialState: MfaComplateActionState = {
  success: false,
};

export default function MfaComplateForm() {

  const [state, formAction] = useActionState(mfaComplateAction, initialState);

  return (
    <>
      <form className="space-y-4" action={formAction}>
        <label className="block space-y-2">
          <span className="text-sm font-medium">6 Haneli Doğrulama Kodu</span>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            name="code"
            className="w-full rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-sm tracking-[0.3em] outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 cursor-pointer"
        >
          MFA Onayla
        </button>
        <p className="text-sm text-red-400">{state.message}</p>
      </form>
    </>
  );
}
