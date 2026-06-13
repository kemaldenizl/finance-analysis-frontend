import Link from "next/link";

export default function MfaButton() {
  return (
    <Link
      href="/mfa/kurulum"
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-4 transition-all hover:border-cyan-500/60 hover:bg-cyan-500/10 hover:shadow-md hover:shadow-cyan-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700 transition-colors group-hover:bg-cyan-500/25 dark:text-cyan-300">
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
          <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          MFA Kurulumu
        </span>
        <span className="text-xs text-slate-600 dark:text-slate-400">
          İki adımlı doğrulamayı kur veya yönet
        </span>
      </span>

      <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-cyan-700 transition-transform group-hover:translate-x-0.5 dark:text-cyan-300">
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
    </Link>
  );
}
