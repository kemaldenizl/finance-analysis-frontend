import type { AssistantAnswer as AssistantAnswerData } from "@/src/features/analysis/ai-analysis/types/analysis.types";

type AssistantAnswerProps = {
  assistant?: AssistantAnswerData;
};

export default function AssistantAnswer({ assistant }: AssistantAnswerProps) {
  return (
    <>
      <article className="rounded-3xl border border-black/10 bg-white/80 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold">Asistan Cevabi</h2>
        {assistant?.question ? (
          <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-200">
            {assistant.question}
          </p>
        ) : null}
        <p className="mt-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-cyan-900 dark:text-cyan-100">
          {assistant?.answer ?? "Asistan cevabı bulunamadı."}
        </p>
      </article>
    </>
  );
}
