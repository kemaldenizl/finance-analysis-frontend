"use client";

import { logoutAllAction } from "@/src/features/auth/logout-all/actions";
import { useActionState } from "react";

export type LogoutAllFormState = {
  success: boolean;
  message?: string;
};

const initialState: LogoutAllFormState = {
  success: false,
};

export default function LogoutAllForm() {
  const [state, formAction] = useActionState(logoutAllAction, initialState);
  return (
    <>
      <form action={formAction}>
        <button
          type="submit"
          className="w-full px-4 py-1 flex gap-2 items-center border border-red-500 rounded-2xl cursor-pointer"
        >
          <span className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          </span>
          <p className="text-red-500">Bütün Hesaplardan Çıkış Yap</p>
          <span className="text-red-500">→</span>
        </button>
      </form>
    </>
  );
}
