import Link from "next/link";
import EmailVerificationForm from "@/src/features/auth/email-validate/components/email-verification-form";

type Props = {
  maskedEmail: string;
};

export function EmailVerificationInfo({ maskedEmail }: Props) {
  return (
    <>
      <section className="w-full max-w-md rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
            Email Doğrulama Gerekli
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Emailini Doğrulaman Gerekli
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Hesabını oluşturduktan sonra gönderdiğimiz doğrulama bağlantısını
            tıklayarak email adresini onaylaman gerekiyor.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
          Doğrulama mailini göremiyorsan spam klasörünü de kontrol edebilirsin.
        </div>
        <EmailVerificationForm maskedEmail={maskedEmail} />
        <p className="mt-5 text-center text-sm text-slate-600 dark:text-slate-300">
          Email adresini doğruladıysan{" "}
          <Link
            href="/giris-yap"
            className="font-semibold text-amber-700 dark:text-amber-300"
          >
            giriş yap
          </Link>
          .
        </p>
      </section>
    </>
  );
}
