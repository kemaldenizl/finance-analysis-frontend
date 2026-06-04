import { RegisterFormCard } from "@/src/features/auth/register/components/register-form-card";

export function RegisterPageView() {
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-14 top-20 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-emerald-500/20 blur-3xl dark:bg-emerald-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>
      <RegisterFormCard />
    </div>
  );
}
