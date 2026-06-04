import TransactionTable from "@/src/features/analysis/ai-analysis/components/transaction-table";
import ChatBot from "@/src/features/analysis/chatbot/components/chatbot";
import CategorySummary from "@/src/features/analysis/ai-analysis/components/category-summary";
import AnomalyAiComment from "@/src/features/analysis/ai-analysis/components/anomaly-ai-comment";
import InstallmentOptions from "@/src/features/analysis/ai-analysis/components/installment-options";
import AssistantAnswer from "@/src/features/analysis/ai-analysis/components/assistant-answer";
import QualityMetrics from "@/src/features/analysis/ai-analysis/components/quality-metrics";
import EngineInfo from "@/src/features/analysis/ai-analysis/components/engine-info";

export default function AiAnalysisPage() {
  return (
    <div className="relative min-h-screen py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-14 top-20 h-72 w-72 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-fuchsia-500/20 blur-3xl dark:bg-fuchsia-400/10" />
        <div className="absolute -right-20 bottom-10 h-80 w-80 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <section className="rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
          <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="inline-flex rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-700 dark:text-fuchsia-300">
                AI Sonuclari
              </p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight">
                Finans Analiz Raporu
              </h1>
              <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
                Transaction listesi, kategorilendirme, anomali sinyalleri,
                harcama tahmini, taksit onerileri ve AI asistan cevabi tek
                ekranda sunulur.
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-900 dark:text-emerald-100">
              Durum: <span className="font-semibold">completed</span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15">
              <p className="text-xs text-slate-500 dark:text-slate-400">Primary Category</p>
              <p className="mt-1 text-lg font-semibold">travel</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Pay: %72.73
              </p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15">
              <p className="text-xs text-slate-500 dark:text-slate-400">Predicted Next Month Spend</p>
              <p className="mt-1 text-lg font-semibold">4276.14 TRY</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Confidence: 0.825</p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15">
              <p className="text-xs text-slate-500 dark:text-slate-400">Recommended Installment</p>
              <p className="mt-1 text-lg font-semibold">10 ay / 600 TRY</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Risk Level: low</p>
            </article>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="space-y-6">            
            <TransactionTable />
            <CategorySummary />
            <AnomalyAiComment />
            <InstallmentOptions />
          </section>
          <section className="space-y-6">
            <AssistantAnswer />
            <QualityMetrics />
            <EngineInfo />
          </section>
        </div>
      </div>
      
      <ChatBot />

    </div>
  );
}
