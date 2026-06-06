"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton( { label }: { label: string } ) {
    const { pending } = useFormStatus();
  
    return (
      <>
        <button
          type="submit"
          className="w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 cursor-pointer"
          disabled={pending}
        >
          {pending ? 'Hesap Oluşturuluyor...' : label}
        </button>
      </>
    );
  }