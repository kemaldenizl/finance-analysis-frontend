"use server";

import { cookies } from "next/headers";
import { isThemeMode, type ThemeMode } from "@/src/shared/types/theme.types";

export async function setTheme(nextTheme: string): Promise<void> {
  if (!isThemeMode(nextTheme)) {
    return;
  }

  const cookieStore = await cookies();

  cookieStore.set("theme", nextTheme as ThemeMode, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    httpOnly: false,
  });
}
