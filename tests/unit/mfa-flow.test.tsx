import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { MfaLoginForm } from "@/src/features/auth/mfa/components/mfa-login-form";
import MfaComplateForm from "@/src/features/auth/mfa/components/mfa-complate-form";
import MfaSetupQr from "@/src/features/auth/mfa/components/mfa-setup-qr";
import { renderWithProviders, screen } from "../utils/render";

vi.mock("@/src/features/auth/mfa/actions", () => ({
  mfaLoginAction: vi.fn(),
  mfaComplateAction: vi.fn(),
}));

describe("MFA flow components", () => {
  it("lets the user enter the MFA login code", async () => {
    const user = userEvent.setup();
    renderWithProviders(<MfaLoginForm />);

    await user.type(screen.getByLabelText("6 Haneli Kod"), "123456");

    expect(screen.getByLabelText("6 Haneli Kod")).toHaveValue("123456");
    expect(screen.getByRole("button", { name: "Giriş Yap" })).toBeInTheDocument();
  });

  it("shows the setup confirmation form and QR fallback", () => {
    renderWithProviders(
      <>
        <MfaSetupQr otpAuthUri="" />
        <MfaComplateForm />
      </>,
    );

    expect(screen.getByText("QR Kod oluşturulamadı.")).toBeInTheDocument();
    expect(screen.getByLabelText("6 Haneli Doğrulama Kodu")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "MFA Onayla" })).toBeInTheDocument();
  });
});
