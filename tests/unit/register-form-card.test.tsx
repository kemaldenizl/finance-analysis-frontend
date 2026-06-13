import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { RegisterFormCard } from "@/src/features/auth/register/components/register-form-card";
import { renderWithProviders, screen } from "../utils/render";

vi.mock("@/src/features/auth/register/actions", () => ({
  registerAction: vi.fn(),
}));

describe("RegisterFormCard", () => {
  it("shows the registration controls a new user needs", () => {
    renderWithProviders(<RegisterFormCard />);

    expect(screen.getByRole("heading", { name: "Kayıt Ol" })).toBeInTheDocument();
    expect(screen.getByLabelText("E-posta")).toBeRequired();
    expect(screen.getByLabelText("Şifre")).toHaveAccessibleDescription(
      "En az 12 karakter oluşmalı ve en az bir büyük, bir küçük harf, bir sayı ve bir özel karakter içermeli.",
    );
    expect(screen.getByRole("button", { name: "Hesap Oluştur" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Giriş Yap" })).toHaveAttribute("href", "/giris-yap");
  });

  it("lets the user reveal and hide the password", async () => {
    const user = userEvent.setup();
    renderWithProviders(<RegisterFormCard />);

    const passwordInput = screen.getByLabelText("Şifre");
    await user.click(screen.getByRole("button", { name: "Şifreyi göster" }));
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Şifreyi gizle" }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
