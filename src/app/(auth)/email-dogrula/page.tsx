import { getPendingVerificationCookie } from "@/src/shared/lib/auth/pending-verification-cookie";
import { redirect } from "next/navigation";
import { EmailVerificationInfo } from "@/src/features/auth/email-validate/components/email-verification-info";

export default async function EmailDogrulaPage() {

  const pendingUser = await getPendingVerificationCookie();
  if(!pendingUser){
    redirect('/giris-yap');
  }

  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-16 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-amber-500/20 blur-3xl dark:bg-amber-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <EmailVerificationInfo maskedEmail={pendingUser.email} />
    </div>
  );
}
