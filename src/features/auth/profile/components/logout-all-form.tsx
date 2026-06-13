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
  const [, formAction, isPending] = useActionState(
    logoutAllAction,
    initialState
  );

  return (
    <form action={formAction}>
      <button
        type="submit"
        disabled={isPending}
        className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-left transition-all hover:border-red-500/60 hover:bg-red-500/10 hover:shadow-md hover:shadow-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-600 transition-colors group-hover:bg-red-500/25 dark:text-red-400">
          {isPending ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
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
              className="h-5 w-5"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          )}
        </span>

        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold text-red-700 dark:text-red-300">
            {isPending ? "Çıkış yapılıyor..." : "Tüm Oturumları Kapat"}
          </span>
          <span className="text-xs text-red-600/80 dark:text-red-400/80">
            Bütün cihazlardaki açık oturumlarından çıkış yap
          </span>
        </span>

        <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-600 transition-transform group-hover:translate-x-0.5 dark:text-red-400">
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
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </button>
    </form>
  );
}
