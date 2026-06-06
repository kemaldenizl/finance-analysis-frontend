import Link from "next/link";
import { ThemeToggle } from "@/src/shared/components/ui/theme-toggle";
import type { ThemeMode } from "@/src/shared/types/theme.types";
import { getAccessToken } from "@/src/shared/lib/auth/token-cookie";
import LogoutButton from "@/src/shared/components/layout/logout-button";

type AppShellProps = Readonly<{
  children: React.ReactNode;
  currentTheme: ThemeMode;
}>;

export async function AppShell({ children, currentTheme }: AppShellProps) {
  const isAuthenticated = Boolean(await getAccessToken());

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-500/15" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/15" />
      </div>

      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold tracking-wide">FinPilot AI</span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-4 text-sm text-slate-600 dark:text-slate-300 md:flex">
              {isAuthenticated ? (
                <>
                  <Link href='/profil'>Profil</Link>
                  <LogoutButton />
                </>
              ) : (
                <>
                  <Link href='/giris-yap'>Giriş Yap</Link>
                  <Link href='/kayit-ol'>Kayıt Ol</Link>
                </>
              )}
            </nav>
            <ThemeToggle currentTheme={currentTheme} />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6 md:py-12">{children}</main>

      <footer className="border-t border-black/10 bg-white/50 py-5 text-xs text-slate-600 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <p>FinPilot AI - Ekstrelerini anlayan finans asistanı.</p>
          <p>Güvenli veri akışı, kategorilendirme, anomali tespiti ve tahminleme.</p>
        </div>
      </footer>
    </div>
  );
}
