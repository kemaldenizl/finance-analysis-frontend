import { expect, test } from "@playwright/test";

test("anonymous user is redirected from protected profile to login", async ({ page }) => {
  await page.goto("/profil");

  await expect(page).toHaveURL(/\/giris-yap$/);
  await expect(page.getByRole("heading", { name: "Hesabına Giriş Yap" })).toBeVisible();
});

test("authenticated cookie redirects user away from login page", async ({ context, page }) => {
  await context.addCookies([
    {
      name: "access_token",
      value: "e2e-access-token",
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      expires: Math.floor(Date.now() / 1000) + 3600,
    },
  ]);

  await page.goto("/giris-yap");

  await expect(page).toHaveURL("http://localhost:3000/");
  await expect(
    page.getByRole("heading", {
      name: "Finans verilerin yapay zeka ile uçtan uca analiz ediliyor",
    }),
  ).toBeVisible();
});

test("MFA login page presents the verification step", async ({ page }) => {
  await page.goto("/mfa/giris-yap");

  await expect(page.getByRole("heading", { name: "Doğrulama Kodunu Gir" })).toBeVisible();
  await page.getByLabel("6 Haneli Kod").fill("123456");
  await expect(page.getByLabel("6 Haneli Kod")).toHaveValue("123456");
});
