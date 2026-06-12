'use client';

import { FormEvent, useMemo, useState, useEffect } from "react";
import { sendChatMessageAction } from "../actions";
import { AssistantAnswer } from "@/src/features/analysis/ai-analysis/types/analysis.types";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  meta?: string;
};

export default function ChatBot({ analysisId, assistant }: { analysisId: string, assistant: AssistantAnswer | undefined }) {

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const hasMessages = useMemo(() => messages.length > 0, [messages.length]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setErrorMessage(null);
    setIsSending(true);

    const result = await sendChatMessageAction({
      analysis_id: analysisId,
      question: trimmedQuestion,
    });

    setIsSending(false);

    if (!result.success || !result.data?.response.answer) {
      setErrorMessage(result.message ?? "Yanıt alınamadı. Lütfen tekrar deneyin.");
      return;
    }

    const assistant = result.data.response;
    setMessages((prev) => [
      ...prev,
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: assistant.answer,
        meta: `${assistant.intent} / ${assistant.generation_method}`,
      },
    ]);
  }

  useEffect(() => {
    if (assistant) {
      setMessages((prev) => {
        // Zaten eklenmişse tekrar ekleme
        if (prev.some((m) => m.id === `user-${Date.now()}`)) return prev;
        if (prev.some((m) => m.id === `assistant-${Date.now() + 1}`)) return prev;
        if (prev.some((m) => m.text === assistant.answer || m.text === assistant.question)) return prev;
        return [
          ...prev,
          { id: `user-${Date.now()}`, role: "user", text: assistant.question },
          { id: `assistant-${Date.now() + 1}`, role: "assistant", text: assistant.answer },
        ];
      });
    }
  }, [assistant]);
  console.log(messages);
  return (
    <>
      <button
        type="button"
        onClick={() => setIsChatOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-30 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
      >
        {isChatOpen ? "Chatbotu Kapat" : "Chatbotu Aç"}
      </button>

      {isChatOpen ? (
        <aside className="fixed bottom-19 right-6 z-30 flex h-[min(520px,calc(100vh-7rem))] w-[360px] flex-col rounded-2xl border border-black/10 bg-white/95 p-4 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-slate-950/90">
          <div className="flex shrink-0 items-center justify-between">
            <h3 className="text-sm font-semibold">AI Chatbot</h3>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
              Online
            </span>
          </div>
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto rounded-xl border border-black/10 bg-background p-3 dark:border-white/15 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {hasMessages ? (
              <div className="space-y-3 text-sm">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div
                      className={
                        message.role === "assistant"
                          ? "max-w-[90%] rounded-xl bg-cyan-500/15 px-3 py-2 text-cyan-900 dark:text-cyan-100"
                          : "ml-auto max-w-[90%] rounded-xl bg-slate-200 px-3 py-2 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                      }
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                {isSending ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">Yanıt hazırlanıyor...</p>
                ) : null}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-center text-xs text-slate-500 dark:text-slate-400">
                Analiz hakkında bir soru göndererek konuşmayı başlatabilirsiniz.
              </div>
            )}
          </div>
          {errorMessage ? (
            <p className="mt-2 shrink-0 text-xs text-red-500">{errorMessage}</p>
          ) : null}
          <form className="mt-3 flex shrink-0 gap-2" onSubmit={handleSubmit}>
            <input
              type="text"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Mesajini yaz..."
              disabled={isSending}
              className="w-full rounded-xl border border-black/10 bg-background px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15"
            />
            <button
              type="submit"
              disabled={isSending || !question.trim()}
              className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
            >
              {isSending ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        </aside>
      ) : null}
    </>
  );
}