"use client";

import { useActionState } from "react";
import { sendAgainEmailVerificationAction, SendAgainEmailVerificationActionState } from "@/src/features/auth/email-validate/action";

const initialState: SendAgainEmailVerificationActionState = {
  success: false,
};

export default function EmailVerificationForm( { maskedEmail }: { maskedEmail: string } ) {

  const [state, formAction] = useActionState(sendAgainEmailVerificationAction, initialState);
  console.log('state',state);
  return (
    <>
      <form action={formAction}>
        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-400 cursor-pointer"
        >
          Doğrulama Linkini Tekrar Gönder
        </button>
        <p className="text-sm text-green-400">{state.message}</p>
      </form>
    </>
  );
}
