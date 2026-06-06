"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  UPLOAD_RESULT_STORAGE_KEY,
  type UploadFileData,
} from "@/src/features/analysis/ai-upload";

function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "-";
  }

  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;

  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DosyaVerileriPage() {
  const [data, setData] = useState<UploadFileData | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem(UPLOAD_RESULT_STORAGE_KEY);

    if (raw) {
      try {
        setData(JSON.parse(raw) as UploadFileData);
      } catch {
        setData(null);
      }
    }

    setIsReady(true);
  }, []);

  const fileDetails = data
    ? [
        { label: "Dosya Adı", value: data.file.fileName },
        { label: "Dosya Türü", value: data.response.classification.kind },
        { label: "Dosya Boyutu", value: formatFileSize(data.file.size) },
        { label: "Yüklenme Tarihi", value: formatDate(data.file.uploadedAt) },
      ]
    : [];

  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-1">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-14 top-20 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <section className="w-full max-w-3xl rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            Yüklenen Dosya
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Dosya ve Bilgi Önizlemesi</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Analiz öncesi dosya bilgilerini kontrol edebilir, ardından verileri
            çıkarma adımına geçebilirsin.
          </p>
        </div>

        {!isReady ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Veriler yükleniyor...
          </p>
        ) : !data ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              Görüntülenecek dosya verisi bulunamadı.
            </p>
            <p className="mt-1 text-xs text-amber-900/80 dark:text-amber-100/80">
              Lütfen önce bir dosya yükleyin.
            </p>
            <Link
              href="/dosya-yukle"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Dosya Yükleme Ekranına Git
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
              <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-dashed border-indigo-500/40 bg-indigo-500/5 p-6">
                <div className="text-center">
                  <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200">
                    {data.file.fileName}
                  </p>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                    Dosya önizleme alanı
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {fileDetails.map((detail) => (
                  <article
                    key={detail.label}
                    className="rounded-2xl border border-black/10 bg-background p-3 dark:border-white/15"
                  >
                    <p className="text-xs text-slate-500 dark:text-slate-400">{detail.label}</p>
                    <p className="mt-1 text-sm font-semibold wrap-break-word">{detail.value}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 cursor-pointer"
              >
                Verileri Çıkar
              </button>
              <Link
                href="/dosya-yukle"
                className="inline-flex w-full items-center justify-center rounded-xl border border-black/10 bg-background px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-black/5 dark:border-white/15 dark:text-slate-200 dark:hover:bg-white/5"
              >
                Dosya Yükleme Ekranına Dön
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
