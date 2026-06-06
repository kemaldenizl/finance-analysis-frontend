"use client";

import { useActionState } from "react";
import {
  resetPasswordAction,
  ResetPasswordActionState,
} from "@/src/features/auth/reset-password/actions";

const initialState: ResetPasswordActionState = {
  success: false,
};

type ResetPasswordFormProps = {
  token: string;
};

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    initialState,
  );

  return (
    <form className="space-y-4" action={formAction}>
      <input type="hidden" name="token" value={token} />

      <label className="block space-y-2">
        <span className="text-sm font-medium">Yeni Şifre</span>
        <input
          type="password"
          name="newPassword"
          placeholder="Yeni şifreni gir"
          autoComplete="new-password"
          required
          className="w-full rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15"
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Gönderiliyor..." : "Onayla"}
      </button>

      {state.message ? (
        <p className="text-sm text-red-500">{state.message}</p>
      ) : null}
    </form>
  );
}
