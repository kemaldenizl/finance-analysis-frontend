import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AiAnalysisPage from "@/src/app/(analysis)/ai-analysis/page";
import { ANALYSIS_RESULT_STORAGE_KEY } from "@/src/features/analysis/ai-analysis";
import { analysisResponse } from "../fixtures/finance";
import { renderWithProviders, screen } from "../utils/render";

vi.mock("@/src/features/analysis/chatbot/components/chatbot", () => ({
  default: ({ analysisId }: { analysisId: string }) => (
    <div>Chatbot hazır: {analysisId}</div>
  ),
}));

vi.mock("@/src/features/analysis/ai-analysis/components/category-circle-chart", () => ({
  default: () => <div>Kategori grafiği hazır</div>,
}));

describe("AiAnalysisPage", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
  });

  it("renders dashboard cards from stored analysis results", () => {
    sessionStorage.setItem(ANALYSIS_RESULT_STORAGE_KEY, JSON.stringify(analysisResponse));

    renderWithProviders(<AiAnalysisPage />);

    expect(screen.getByRole("heading", { name: "Finans Analiz Raporu" })).toBeInTheDocument();
    expect(screen.getByText("food")).toBeInTheDocument();
    expect(screen.getByText(/4200.00 TRY/)).toBeInTheDocument();
    expect(screen.getAllByText("Migros").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Kalite Metrikleri" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Taksit Önerileri" })).toBeInTheDocument();
    expect(screen.getByText("Chatbot hazır: analysis-1")).toBeInTheDocument();
  });

  it("guides the user back to transaction entry when analysis data is missing", () => {
    sessionStorage.removeItem(ANALYSIS_RESULT_STORAGE_KEY);

    renderWithProviders(<AiAnalysisPage />);

    expect(screen.getByText("Görüntülenecek analiz verisi bulunamadı.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "İşlem Giriş Ekranına Git" })).toHaveAttribute(
      "href",
      "/satir-giris",
    );
  });
});
