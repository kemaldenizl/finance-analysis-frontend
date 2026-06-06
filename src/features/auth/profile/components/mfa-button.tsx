import Link from "next/link";

export default function MfaButton() {
  return (
    <>
      <Link
        href="/mfa/kurulum"
        className="px-4 py-1 flex gap-2 items-center border border-cyan-800 rounded-2xl cursor-pointer"
      >
        <span className="">
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
            <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5l-8-3Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>
        <p>MFA Kurulumunu Yap / Yönet</p>
        <span>→</span>
      </Link>
    </>
  );
}
