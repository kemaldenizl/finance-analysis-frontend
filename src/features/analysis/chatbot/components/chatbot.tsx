'use client';

import { useState } from "react";
export default function ChatBot() {

  const [isChatOpen, setIsChatOpen] = useState(false);

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
        <aside className="fixed bottom-24 right-6 z-30 h-[520px] w-[360px] rounded-2xl border border-black/10 bg-white/95 p-4 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-slate-950/90">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">AI Chatbot</h3>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
              Online
            </span>
          </div>
          <div className="mt-4 h-[390px] overflow-y-auto rounded-xl border border-black/10 bg-background p-3 dark:border-white/15">
            <div className="space-y-3 text-sm">
              <div className="max-w-[90%] rounded-xl bg-slate-200 px-3 py-2 text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                Gelecek ay harcama ve anomali durumum nedir?
              </div>
              <div className="ml-auto max-w-[90%] rounded-xl bg-cyan-500/15 px-3 py-2 text-cyan-900 dark:text-cyan-100">
                Tahmini aylik harcama: 4276.14 TRY. 1 adet yuksek riskli anomali
                sinyali goruluyor. Onerilen taksit: 10 ay / 600 TRY.
              </div>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Mesajini yaz..."
              className="w-full rounded-xl border border-black/10 bg-background px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-white/15"
            />
            <button
              type="button"
              className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
            >
              Gönder
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}