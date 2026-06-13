"use client";

import { useProfile } from "@/src/shared/hooks/profile";
import LogoutAllForm from "@/src/features/auth/profile/components/logout-all-form";
import MfaButton from "@/src/features/auth/profile/components/mfa-button";

const securityHighlights = [
  {
    title: "Mail bildirimleri",
    description:
      "Mail adresin hesap bildirimleri ve güvenlik uyarıları için kullanılır.",
  },
  {
    title: "İki adımlı doğrulama",
    description: "MFA kurulumu hesabına ikinci bir doğrulama katmanı ekler.",
  },
  {
    title: "Oturum kontrolü",
    description: "Tüm hesaplardan çıkış, açık olan bütün oturumları kapatır.",
  },
];

export default function ProfilPage() {
  const profileResult = useProfile();
  const profile = profileResult.profile;

  const email = profile?.email ?? "";
  const avatarInitial = email.charAt(0).toUpperCase() || "?";

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 py-2 md:gap-8 md:py-6">
      {/* Başlık */}
      <header className="flex flex-col gap-4">
        <span className="w-fit inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300" />
          Profil ve Güvenlik
        </span>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Hesap bilgilerini ve güvenlik ayarlarını yönet
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300 md:text-base">
            FinPilot AI hesabının mail bilgisini görüntüleyebilir, iki adımlı
            doğrulamayı yönetebilir ve gerekli durumlarda tüm açık oturumlarını
            kapatabilirsin.
          </p>
        </div>
      </header>

      {/* İçerik */}
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        {/* Kimlik kartı */}
        <div className="flex flex-col gap-6 rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:p-8">
          <div className="flex items-center gap-4">
            <div className="p-2 relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold dark:text-white">
              {avatarInitial}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Aktif hesap
              </p>
              <p className="mt-1 truncate text-lg font-semibold">
                {email || "Yükleniyor..."}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {securityHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/10 bg-background/40 p-4 transition hover:border-cyan-500/30 hover:bg-cyan-500/5 dark:border-white/10"
              >
                <div className="flex items-center gap-2">
                  <span className="mb-2 flex h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-300" />
                  <p className="text-xs font-semibold">{item.title}</p>
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Güvenlik işlemleri */}
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Güvenlik İşlemleri</h2>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                Hesabını korumak için MFA kurulumunu tamamla veya tüm cihazlarda
                aktif olan oturumlarını sonlandır.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <MfaButton />
              <LogoutAllForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
