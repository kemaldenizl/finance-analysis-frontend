import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { LoginFormCard } from "@/src/features/auth/login/components/login-form-card";
import { renderWithProviders, screen } from "../utils/render";

vi.mock("@/src/features/auth/login/actions", () => ({
  loginAction: vi.fn(),
}));

describe("LoginFormCard", () => {
  it("renders the login form fields and account links", () => {
    renderWithProviders(<LoginFormCard />);

    expect(screen.getByRole("heading", { name: "Hesabına Giriş Yap" })).toBeInTheDocument();
    expect(screen.getByLabelText("E-posta")).toBeRequired();
    expect(screen.getByLabelText("Sifre")).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: "Giriş Yap" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Şifremi Unuttum" })).toHaveAttribute("href", "/sifremi-unuttum");
    expect(screen.getByRole("link", { name: "Kayıt Ol" })).toHaveAttribute("href", "/kayit-ol");
  });

  it("lets the user toggle password visibility", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginFormCard />);

    const passwordInput = screen.getByLabelText("Sifre");
    await user.click(screen.getByRole("button", { name: "Şifreyi göster" }));

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Şifreyi gizle" })).toBeInTheDocument();
  });
});
