"use client";

import { useEffect, useState, useTransition } from "react";
import { setTheme } from "@/src/shared/components/ui/theme.actions";
import type { ThemeMode } from "@/src/shared/types/theme.types";

type ThemeToggleProps = {
  currentTheme: ThemeMode;
};

const labels: Record<ThemeMode, string> = {
  light: "Aydınlık",
  dark: "Karanlık",
};

export function ThemeToggle({ currentTheme }: ThemeToggleProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticTheme, setOptimisticTheme] = useState<ThemeMode>(currentTheme);

  useEffect(() => {
    setOptimisticTheme(currentTheme);
  }, [currentTheme]);

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 p-1 shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/5">
      {(Object.keys(labels) as ThemeMode[]).map((theme) => {
        const isActive = optimisticTheme === theme;

        return (
          <button
            key={theme}
            type="button"
            onClick={() =>
              startTransition(async () => {
                setOptimisticTheme(theme);
                document.documentElement.classList.toggle("dark", theme === "dark");
                await setTheme(theme);
              })
            }
            aria-pressed={isActive}
            disabled={isPending || isActive}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              isActive
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10 cursor-pointer"
            } disabled:cursor-not-allowed disabled:opacity-80`}
          >
            {labels[theme]}
          </button>
        );
      })}
    </div>
  );
}
