import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import DosyaYuklePage from "@/src/app/(analysis)/dosya-yukle/page";
import { useProfile } from "@/src/shared/hooks/profile";
import { renderWithProviders, screen } from "../utils/render";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock("@/src/shared/hooks/profile", () => ({
  useProfile: vi.fn(),
}));

vi.mock("@/src/features/analysis/ai-upload", async () => {
  const actual = await vi.importActual<typeof import("@/src/features/analysis/ai-upload")>(
    "@/src/features/analysis/ai-upload",
  );

  return {
    ...actual,
    uploadTransactionFileAction: vi.fn(),
  };
});

const mockedUseProfile = vi.mocked(useProfile);

describe("DosyaYuklePage", () => {
  it("keeps upload disabled until the user profile is loaded", () => {
    mockedUseProfile.mockReturnValue({
      profile: null,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(<DosyaYuklePage />);

    expect(screen.getByRole("heading", { name: "İşlem Dökümanını Yükle" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dosyayı Yükle" })).toBeDisabled();
  });

  it("shows the selected file name before submit", async () => {
    const user = userEvent.setup();
    mockedUseProfile.mockReturnValue({
      profile: {
        userId: "user-1",
        email: "demo@finpilot.test",
        sessionId: "session-1",
        accessTokenJti: "jti-1",
        permissions: ["analysis:write"],
      },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });
    renderWithProviders(<DosyaYuklePage />);

    await user.upload(
      screen.getByLabelText(/Dosya Seç veya Sürükle-Bırak/),
      new File(["ekstre"], "ekstre-ocak.pdf", { type: "application/pdf" }),
    );

    expect(screen.getByText("ekstre-ocak.pdf")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dosyayı Yükle" })).toBeEnabled();
  });
});
