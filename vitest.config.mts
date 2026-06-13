import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}", "tests/integration/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: [
        ".next/**",
        "coverage/**",
        "node_modules/**",
        "tests/**",
        "playwright.config.ts",
        "vitest.config.mts",
        "next.config.*",
        "next-env.d.ts",
        "**/*.d.ts",
        "**/*.config.{js,cjs,mjs,ts,mts}",
      ],
    },
  },
});
