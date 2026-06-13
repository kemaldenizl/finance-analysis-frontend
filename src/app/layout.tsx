import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AppShell } from "@/src/shared/components/layout/app-shell";
import { isThemeMode, type ThemeMode } from "@/src/shared/types/theme.types";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "FinPilot AI | Akıllı Finans Destek Sistemi",
  description:
    "Aylık ekstrelere AI analizi, harcama profillemesi, anomali tespiti ve sohbet destekli finans asistanı.",
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

async function resolveThemeFromCookies(): Promise<ThemeMode> {
  const cookieStore = await cookies();
  const rawTheme = cookieStore.get("theme")?.value;

  if (rawTheme && isThemeMode(rawTheme)) {
    return rawTheme;
  }

  return "light";
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentTheme = await resolveThemeFromCookies();

  return (
    <html
      lang="tr"
      className={cn("h-full", "antialiased", currentTheme === "dark" ? "dark" : "", "font-sans", geist.variable)}
    >
      <body className="min-h-full">
        <AppShell currentTheme={currentTheme}>{children}</AppShell>
      </body>
    </html>
  );
}
