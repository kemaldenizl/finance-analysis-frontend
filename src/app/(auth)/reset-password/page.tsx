import Link from "next/link";
import ResetPasswordForm from "@/src/features/auth/reset-password/components/reset-password-form";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export default async function ResetPasswordPage( { searchParams }: ResetPasswordPageProps ) {
  const params = await searchParams;
  const token = params.token;

  if(!token) {
    return <ResetPasswordError />;
  }

  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-16 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300">
            Yeni Şifre
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Şifremi Sıfırla</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Hesabın için yeni bir şifre belirle ve güvenli şekilde giriş yapmaya
            devam et.
          </p>
        </div>

        <ResetPasswordForm token={token} />

        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
          Giriş ekranına dönmek için{" "}
          <Link href="/giris-yap" className="font-semibold text-violet-700 dark:text-violet-300">
            tıkla
          </Link>
          .
        </p>
      </section>
    </div>
  );
}

function ResetPasswordError() {
  return (
    <>
      <div className="relative flex min-h-[78vh] items-center justify-center py-12">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-16 top-16 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-emerald-500/20 blur-3xl dark:bg-emerald-400/10" />
          <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
        </div>
      </div>
      <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            Şifre Sıfırlama Bağlantısı Geçersiz
          </p>
        </div>
      </section>
    </>
  );
}