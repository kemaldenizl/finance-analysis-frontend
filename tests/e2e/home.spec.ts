import { expect, test } from "@playwright/test";

test("visitor can navigate from the home page to login", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Ekstrelerini anlayan ve sana yön veren modern finans asistanı",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Hemen Ücretsiz Giriş Yap" }).click();

  await expect(page).toHaveURL(/\/giris-yap$/);
  await expect(page.getByRole("heading", { name: "Hesabına Giriş Yap" })).toBeVisible();
});

test("visitor can move between login and registration flows", async ({ page }) => {
  await page.goto("/giris-yap");

  await page.getByRole("main").getByRole("link", { name: "Kayıt Ol" }).click();

  await expect(page).toHaveURL(/\/kayit-ol$/);
  await expect(page.getByRole("heading", { name: "Kayıt Ol" })).toBeVisible();
  await expect(page.getByLabel("E-posta", { exact: true })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Şifre", exact: true })).toBeVisible();
});
