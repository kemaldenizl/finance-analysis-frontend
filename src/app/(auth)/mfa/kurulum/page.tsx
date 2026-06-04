const setupMethods = [
  {
    title: "Google Authenticator",
    description:
      "Google Authenticator uygulamasıyla QR kodu okutup 30 saniyede yenilenen tek kullanımlık kodlar alabilirsin.",
  },
  {
    title: "Microsoft Authenticator",
    description:
      "Microsoft Authenticator ile hesabını cihazına bağlayabilir, güvenli giriş kodlarını kolayca doğrulayabilirsin.",
  },
  {
    title: "Authy ve Benzeri Uygulamalar",
    description:
      "TOTP destekleyen diğer doğrulama uygulamalarıyla da MFA kurulumunu tamamlayabilirsin.",
  },
];

const setupTips = [
  "Telefon saatinin otomatik ayarlı olması kodların doğru çalışması için önemlidir.",
  "Kod üretici uygulamayı silmeden önce hesabın bağlı olduğundan emin ol.",
  "Yeni cihaza geçişte recovery kodların hesabını kurtarmak için gerekir.",
];

export default function MfaSetupPage() {
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center py-1">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-16 top-16 h-64 w-64 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-400/10" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-cyan-500/20 blur-3xl dark:bg-cyan-400/10" />
      </div>

      <section className="w-full max-w-2xl rounded-3xl border border-black/10 bg-white/80 p-7 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5">
        <div className="mb-6">
          <p className="inline-flex rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700 dark:text-violet-300">
            MFA Kurulumu
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">İki Adımlı Doğrulamayı Etkinleştir</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            MFA, şifren ele geçirilse bile hesabını ikinci bir doğrulama adımı
            ile korur. Aşağıdaki yöntemlerden birini kullanarak kurulumunu
            tamamlayabilirsin.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {setupMethods.map((method) => (
            <article
              key={method.title}
              className="rounded-2xl border border-black/10 bg-background p-4 dark:border-white/15"
            >
              <h2 className="text-sm font-semibold">{method.title}</h2>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
                {method.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
          <h3 className="text-sm font-semibold text-violet-800 dark:text-violet-200">
            Kurulum İpuçları
          </h3>
          <ul className="mt-2 space-y-1.5 text-xs text-violet-900 dark:text-violet-100">
            {setupTips.map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[220px_1fr]">
          <div className="flex h-[220px] items-center justify-center rounded-2xl border border-black/10 bg-background dark:border-white/15">
            <div className="text-center">
              <div className="mx-auto grid h-28 w-28 grid-cols-6 gap-1 rounded-md bg-black/90 p-2 dark:bg-white/90">
                {Array.from({ length: 36 }).map((_, index) => (
                  <span
                    key={index}
                    className={`rounded-[2px] ${
                      index % 3 === 0 || index % 5 === 0
                        ? "bg-white/90 dark:bg-black/90"
                        : "bg-transparent"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">QR Kod</p>
            </div>
          </div>

          <form className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium">6 Haneli Doğrulama Kodu</span>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                className="w-full rounded-xl border border-black/10 bg-background px-3.5 py-2.5 text-sm tracking-[0.3em] outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-white/15"
              />
            </label>
            <button
              type="button"
              className="w-full rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 cursor-pointer"
            >
              MFA Onayla
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
