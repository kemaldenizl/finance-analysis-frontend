import { LoginFormCard } from "@/src/features/auth/login/components/login-form-card";

export function LoginPageView() {
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-16 h-64 w-64 animate-[pulse_5s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
        <div className="absolute -right-20 bottom-10 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-400/10" />
      </div>
      <LoginFormCard />
    </div>
  );
}
