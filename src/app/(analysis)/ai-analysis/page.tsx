"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TransactionTable from "@/src/features/analysis/ai-analysis/components/transaction-table";
import ChatBot from "@/src/features/analysis/chatbot/components/chatbot";
import CategorySummary from "@/src/features/analysis/ai-analysis/components/category-summary";
import AnomalyAiComment from "@/src/features/analysis/ai-analysis/components/anomaly-ai-comment";
import InstallmentOptions from "@/src/features/analysis/ai-analysis/components/installment-options";
import AssistantAnswer from "@/src/features/analysis/ai-analysis/components/assistant-answer";
import QualityMetrics from "@/src/features/analysis/ai-analysis/components/quality-metrics";
import EngineInfo from "@/src/features/analysis/ai-analysis/components/engine-info";
import { ANALYSIS_RESULT_STORAGE_KEY } from "@/src/features/analysis/ai-analysis";
import type { AnalysisResponse } from "@/src/features/analysis/ai-analysis/types/analysis.types";

function formatPercent(value: number | null | undefined): string {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "-";
  }
  return `%${(value * 100).toFixed(2)}`;
}

function formatNumber(value: number | null | undefined): string {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "-";
  }
  return value.toFixed(2);
}

export default function AiAnalysisPage() {
  const [analysis, setAnalysis] = useState<AnalysisResponse["response"] | null>(
    null,
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(ANALYSIS_RESULT_STORAGE_KEY);

    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AnalysisResponse;
        setAnalysis(parsed.response ?? null);
      } catch {
        setAnalysis(null);
      }
    }

    setIsReady(true);
  }, []);

  const result = analysis?.result;
  const recommendation = result?.installment_recommendation;
  const recommendedOption = recommendation?.options?.find(
    (option) => option.months === recommendation.recommended_months,
  );

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
              Durum:{" "}
              <span className="font-semibold">{analysis?.status ?? "-"}</span>
            </div>
          </div>

          {result?.executive_summary && result.executive_summary.length > 0 ? (
            <div className="mb-6 space-y-2">
              {result.executive_summary.map((summary, index) => (
                <p
                  key={index}
                  className="rounded-2xl border border-black/10 bg-background p-4 text-sm leading-6 text-slate-700 dark:border-white/15 dark:text-slate-200"
                >
                  {summary}
                </p>
              ))}
            </div>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15">
              <p className="text-xs text-slate-500 dark:text-slate-400">Primary Category</p>
              <p className="mt-1 text-lg font-semibold">
                {result?.spending_profile?.primary_category ?? "-"}
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Pay: {formatPercent(result?.spending_profile?.primary_category_share)}
              </p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15">
              <p className="text-xs text-slate-500 dark:text-slate-400">Predicted Next Month Spend</p>
              <p className="mt-1 text-lg font-semibold">
                {formatNumber(result?.forecast?.predicted_next_month_spend)}{" "}
                {result?.forecast?.currency ?? ""}
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Confidence: {result?.forecast?.confidence ?? "-"}
              </p>
            </article>
            <article className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15">
              <p className="text-xs text-slate-500 dark:text-slate-400">Recommended Installment</p>
              <p className="mt-1 text-lg font-semibold">
                {recommendation?.recommended_months ?? "-"} ay /{" "}
                {recommendedOption
                  ? `${formatNumber(recommendedOption.monthly_amount)} ${recommendation?.currency ?? ""}`
                  : "-"}
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Risk Level: {recommendedOption?.risk_level ?? "-"}
              </p>
            </article>
          </div>
        </section>

        {isReady && !analysis ? (
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              Görüntülenecek analiz verisi bulunamadı.
            </p>
            <p className="mt-1 text-xs text-amber-900/80 dark:text-amber-100/80">
              Lütfen önce işlemleri girip analizi başlatın.
            </p>
            <Link
              href="/satir-giris"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              İşlem Giriş Ekranına Git
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <section className="space-y-6">
              <TransactionTable transactions={result?.categorization?.transactions} />
              <CategorySummary summary={result?.categorization?.summary} />
              <AnomalyAiComment anomalies={result?.anomalies} />
              <InstallmentOptions recommendation={recommendation} />
            </section>
            <section className="space-y-6">
              <AssistantAnswer assistant={result?.assistant} />
              <QualityMetrics quality={analysis?.quality} />
              <EngineInfo engine={analysis?.engine} warnings={analysis?.warnings} />
            </section>
          </div>
        )}
      </div>

      
      {analysis?.analysis_id && <ChatBot analysisId={analysis.analysis_id}/>}
    </div>
  );
}
