// @vitest-environment node
import { describe, expect, it, vi } from "vitest";
import { startAnalysisAction } from "@/src/features/analysis/ai-analysis/actions";
import { uploadTransactionFileAction } from "@/src/features/analysis/ai-upload/actions";
import { loginAction } from "@/src/features/auth/login/actions";
import { mfaLoginAction } from "@/src/features/auth/mfa/actions";

vi.mock("@/src/shared/lib/auth/token-cookie", () => ({
  getAccessToken: vi.fn(async () => "access-token"),
  getRefreshToken: vi.fn(async () => "refresh-token"),
  getMfaChallengeCookie: vi.fn(async () => "challenge-token"),
  setAuthCookies: vi.fn(),
  clearMfaChallengeCookie: vi.fn(),
}));

describe("server action error scenarios", () => {
  it("returns field errors when login submit data is invalid", async () => {
    const formData = new FormData();
    formData.set("email", "bad-email");
    formData.set("password", "");

    const result = await loginAction({ success: false }, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Lütfen form alanındaki bilgileri kontrol ediniz.");
    expect(result.fieldErrors?.email).toContain("Geçerli bir email adresi gir.");
  });

  it("rejects file upload submit when no file is selected", async () => {
    const formData = new FormData();
    formData.set("user_id", "user-1");

    const result = await uploadTransactionFileAction({ success: false }, formData);

    expect(result).toEqual({
      success: false,
      message: "Lütfen yüklenecek bir dosya seçin.",
    });
  });

  it("rejects MFA login submit when the code is not six digits", async () => {
    const formData = new FormData();
    formData.set("code", "123");

    const result = await mfaLoginAction({ success: false }, formData);

    expect(result).toEqual({
      success: false,
      message: "Lütfen kodu kontrol ediniz.",
    });
  });

  it("returns validation errors when analysis submit data is incomplete", async () => {
    const formData = new FormData();
    formData.set("transactions", JSON.stringify([]));
    formData.set(
      "purchase_scenario",
      JSON.stringify({
        amount: 0,
        currency: "TRY",
        max_installment_months: 6,
      }),
    );

    const result = await startAnalysisAction({ success: false }, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Lütfen girdiğiniz işlem bilgilerini kontrol ediniz.");
    expect(result.errors).toEqual(
      expect.arrayContaining([
        "En az bir harcama satırı girmelisiniz.",
        "Taksit senaryosu: Toplam fiyat 0'dan büyük olmalıdır.",
      ]),
    );
  });
});
