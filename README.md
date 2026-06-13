This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Finance Analysis Frontend Proje Dokumantasyonu

Bu dokuman, `finance-analysis-frontend` projesinin mevcut kod tabanini bastan sona aciklar. Dokumantasyon yazilirken proje dosyalari incelenmis, Next.js surumu icin repodaki `AGENTS.md` uyarisi dikkate alinmis ve yerel `node_modules/next/dist/docs/` altindaki App Router dokumani okunmustur. Proje kodu degistirilmemistir; bu dosya yalnizca dokumantasyon amaciyla hazirlanmistir.

## 1. Genel Bakis

Proje, FinPilot AI adli akilli finans destek sisteminin frontend uygulamasidir. Uygulama kullanicinin finans hareketlerini dosya yukleyerek veya manuel satir girisiyle alir, bu verileri backend API'lerine iletir, yapay zeka destekli analiz sonucunu gorsellestirir ve analiz uzerinden sohbet edilebilen bir asistan sunar.

Uygulamanin ana yetenekleri:

- Kullanici kaydi, girisi, email dogrulama ve sifre sifirlama.
- HTTP-only cookie tabanli access token / refresh token oturum yonetimi.
- Access token yoksa refresh token ile sessiz token yenileme.
- MFA kurulum, MFA giris ve recovery code gosterimi.
- Profil ve guvenlik ekrani.
- Dosya yukleme ile finans dokumani alma.
- Yuklenen dosyadan transaction verisi cikarma.
- Manuel transaction girisi.
- Taksit senaryosu girisi.
- AI finans analizi baslatma.
- Analiz raporu, kategori dagilimi, anomali, tahmin, taksit onerileri ve kalite metrikleri gosterimi.
- Analiz sonucuna bagli chatbot ile soru-cevap.
- Light/dark tema tercihi.
- Unit, integration ve e2e test altyapisi.

## 2. Teknoloji Yigini

`package.json` dosyasina gore proje asagidaki ana teknolojileri kullanir:

- Next.js `16.2.7`
- React `19.2.4`
- React DOM `19.2.4`
- TypeScript `^5`
- Tailwind CSS `^4`
- shadcn `^4.11.0`
- Radix UI `^1.5.0`
- Recharts `^3.8.1`
- Zod `^4.4.3`
- iron-session `^8.0.4`
- qrcode.react `^4.2.0`
- lucide-react `^1.18.0`
- Vitest `^4.1.8`
- Playwright `^1.60.0`
- MSW `^2.14.6`
- Testing Library
- Axe Playwright accessibility test araci

Next.js App Router kullanilmaktadir. Yerel Next.js dokumaninda App Router'in dosya sistemi tabanli routing yaptigi ve Server Components, Suspense, Server Functions gibi modern React ozellikleriyle calistigi belirtilir. Bu projede `src/app` altindaki rota yapisi bu yaklasimi takip eder.

## 3. Calisma Komutlari

`package.json` scriptleri:

| Komut | Aciklama |
| --- | --- |
| `npm run dev` | Next.js development server baslatir. |
| `npm run build` | Production build alir. |
| `npm run start` | Production server baslatir. |
| `npm run lint` | ESLint calistirir. |
| `npm run test` | Vitest watch/mod calistirir. |
| `npm run test:run` | Vitest testlerini tek sefer calistirir. |
| `npm run test:coverage` | Coverage raporu uretir. |
| `npm run test:e2e` | Playwright e2e testlerini calistirir. |
| `npm run test:e2e:ui` | Playwright UI modunu acar. |
| `npm run test:all` | Once Vitest, sonra Playwright testlerini calistirir. |

## 4. Ortam Degiskenleri

`.env` dosyasinda degerleri dokumante edilmeden yalnizca anahtarlar incelenmistir:

| Degisken | Kullanim |
| --- | --- |
| `API_BASE_URL` | Backend API'nin base URL'i. `serverApi` ve refresh servisi bunu kullanir. Eksikse hata firlatilir. |
| `NEXT_PUBLIC_APP_URL` | Server tarafinda kendi Next route'larina absolute URL uretmek icin kullanilir. |
| `RECOVERY_CODES_COOKIE_SECRET` | MFA recovery code cookie'sini `iron-session` ile seal/unseal etmek icin kullanilir. En az 32 karakter olmalidir. |

`NODE_ENV=production` oldugunda auth cookie'leri `secure: true` olacak sekilde ayarlanir.

## 5. Klasor ve Dosya Yapisi

Ust seviye yapinin gorevi:

| Yol | Gorev |
| --- | --- |
| `src/app` | Next.js App Router sayfalari, route groups ve API route handler'lari. |
| `src/features` | Domain bazli feature modulleri: auth, analysis, home, user. |
| `src/shared` | Ortak API wrapper'lari, auth helper'lari, validation, hook ve layout bilesenleri. |
| `components/ui` | shadcn/Recharts uyumlu ortak chart bileseni. |
| `lib` | Ortak utility fonksiyonlari. |
| `tests` | Unit, integration, e2e, fixture ve MSW test altyapisi. |
| `public` | Statik asset dosyalari. |
| `node_modules/next/dist/docs` | Bu Next surumunun yerel dokumanlari. |

Onemli konfigurasyon dosyalari:

| Dosya | Aciklama |
| --- | --- |
| `next.config.ts` | Next ayarlari. Server Actions body limit'i `10mb`. |
| `tsconfig.json` | Strict TypeScript, `@/*` path alias, Next plugin ve App Router type include ayarlari. |
| `eslint.config.mjs` | Next core web vitals, TypeScript, Testing Library ve Playwright lint ayarlari. |
| `vitest.config.mts` | jsdom ortaminda unit/integration testleri; coverage v8. |
| `playwright.config.ts` | e2e testleri icin build/start web server, Chromium/Firefox/WebKit projeleri. |
| `components.json` | shadcn konfigurasyonu; `radix-nova`, Tailwind 4, alias'lar ve lucide icon kutuphanesi. |
| `postcss.config.mjs` | Tailwind PostCSS plugin ayari. |
| `AGENTS.md` | Next.js surumu icin yerel dokuman okuma talimati. |
| `CLAUDE.md` | `AGENTS.md` dosyasina referans verir. |

## 6. Routing Mimarisi

Proje Next.js App Router kullanir. Sayfalar `src/app` altinda route group'larla ayrilmistir:

- `(auth)` route group'u: giris, kayit, sifre, email dogrulama, profil, MFA sayfalari.
- `(analysis)` route group'u: AI analiz baslangici, dosya yukleme, manuel satir girisi ve analiz sonucu sayfalari.
- `api` klasoru: Next route handler'lari; frontend ile backend arasinda BFF/proxy katmani.

Route group isimleri URL'e dahil olmaz. Ornegin `src/app/(auth)/giris-yap/page.tsx` gercek URL olarak `/giris-yap` altinda calisir.

## 7. Ana Layout ve Global Stil

### `src/app/layout.tsx`

Root layout:

- Metadata tanimlar:
  - Title: `FinPilot AI | Akilli Finans Destek Sistemi`
  - Description: AI analizi, harcama profillemesi, anomali tespiti ve sohbet destekli finans asistani.
- `next/font/google` ile Geist fontunu yukler.
- Cookie'den `theme` degerini okur.
- `theme` cookie degeri `light` veya `dark` ise kullanir, aksi halde `light` varsayar.
- HTML `lang="tr"` olarak ayarlanmistir.
- `dark` class'i tema durumuna gore `<html>` uzerine eklenir.
- Tum sayfa icerigi `AppShell` icine yerlestirilir.

### `src/app/globals.css`

Global CSS:

- Tailwind CSS 4 import eder.
- `tw-animate-css` ve `shadcn/tailwind.css` import eder.
- `@custom-variant dark` ile dark mode varyanti tanimlanir.
- CSS variable tabanli tema token'lari tanimlanir.
- Light ve dark tema icin background, foreground, card, border, chart, sidebar, radius gibi token'lar ayarlanir.
- `@layer base` icinde border/ring ve body renkleri uygulanir.

## 8. AppShell ve Navigasyon

### `src/shared/components/layout/app-shell.tsx`

`AppShell`, tum sayfalarin ortak kabugudur.

Gorevleri:

- Header, main ve footer yapisini kurar.
- Auth durumunu `getAccessToken()` ile HTTP-only cookie uzerinden server tarafinda kontrol eder.
- Kullanici authenticated ise navigasyonda:
  - `AI Analizi` -> `/ai-basla`
  - `Profil` -> `/profil`
  - `LogoutButton`
- Kullanici authenticated degilse:
  - `Giris Yap` -> `/giris-yap`
  - `Kayit Ol` -> `/kayit-ol`
- `ThemeToggle` bilesenini gosterir.
- Footer'da FinPilot AI aciklamasi ve guvenli veri akisi/kategorilendirme/anomali/tahminleme mesajlari vardir.

### `src/shared/components/layout/logout-button.tsx`

Client component'tir. `logoutAction` server action'ini form action olarak kullanir. Tiklaninca backend logout endpoint'ine gidilir, auth cookie'leri temizlenir ve `/giris-yap` adresine redirect edilir.

## 9. Tema Sistemi

### `src/shared/types/theme.types.ts`

Desteklenen tema modlari:

- `light`
- `dark`

`isThemeMode` runtime type guard olarak kullanilir.

### `src/shared/components/ui/theme-toggle.tsx`

Client component'tir.

- `currentTheme` prop'u root layout'tan gelir.
- Optimistic state ile tema aninda degistirilir.
- `document.documentElement.classList.toggle("dark", theme === "dark")` ile DOM class'i guncellenir.
- `setTheme` server action'i cagrilarak cookie kalici hale getirilir.

### `src/shared/components/ui/theme.actions.ts`

`setTheme` server action'i:

- Gelen deger `light` veya `dark` degilse hicbir islem yapmaz.
- `theme` cookie'sini 1 yil sureyle yazar.
- Cookie `httpOnly: false` oldugu icin istemci tarafindan okunabilir niteliktedir.

## 10. API Erişim Katmani

Projede iki farkli API helper vardir:

1. `serverApi`: Next server/route handler katmanindan backend API'ye gider.
2. `routeApi`: Frontend veya server action katmanindan Next'in kendi `/api/...` route'larina gider.

Bu ayrim projede BFF yaklasimi olusturur. Client/server action direkt backend base URL'ine gitmek yerine genellikle Next route handler'a gider; route handler backend'e `serverApi` ile ulasir.

### `src/shared/lib/api/types.ts`

Ortak tipler:

- `HttpMethod`: `GET | POST | PUT | PATCH | DELETE`
- `ApiSuccess<T>`: `success: true`, `data`, `status`
- `ApiError`: `success: false`, `error`, `status`, opsiyonel `details`
- `ApiResult<T>`: success/error union
- `QueryParams`: string/number/boolean/null/undefined degerleri destekleyen query objesi.

### `src/shared/lib/api/server-api.ts`

`serverApi` backend API'ye istek atar.

Davranis:

- `API_BASE_URL` zorunludur.
- Endpoint basinda slash yoksa eklenir.
- Query parametreleri `URLSearchParams` ile eklenir.
- Varsayilan method `GET`, varsayilan cache `no-store`.
- Body `FormData` ise JSON'a cevrilmez ve `Content-Type` elle set edilmez.
- Body `FormData` degilse JSON stringify edilir ve `Content-Type: application/json` set edilir.
- `token` varsa `Authorization: Bearer <token>` header'i eklenir.
- Response JSON ise parse edilir.
- Basarisiz HTTP cevaplarinda `message`, `error`, `statusText` veya genel `Request failed.` mesaji kullanilir.
- `authRetry: true` ve response status `401` ise `refreshAction(refreshToken)` denenir.
- Refresh basarili olursa ayni istek yeni access token ile tekrar edilir.
- Network/throw durumunda `status: 500` ve hata mesaji dondurulur.

### `src/shared/lib/api/route-api.ts`

`routeApi`, Next route handler'larina istek atar.

Base URL davranisi:

- Browser tarafinda relative URL dondurur.
- Server tarafinda once `NEXT_PUBLIC_APP_URL`, sonra `VERCEL_URL`, en sonda `http://localhost:3000` kullanir.

Istek davranisi:

- Varsayilan method `GET`, varsayilan cache `no-store`.
- Body `FormData` ise `Content-Type` elle set edilmez.
- Body JSON ise stringify edilir.
- `Refresh-Token` header'i `refreshToken ?? ""` olarak eklenir.
- `credentials: "include"` kullanilir.
- Response JSON ise parse edilir.
- Basarili cevapta `payload.data ?? payload` data olarak kullanilir.

## 11. Auth ve Cookie Yardimcilari

### `src/shared/lib/auth/token-cookie.ts`

Cookie isimleri:

- `access_token`
- `refresh_token`
- `mfa_challenge`

Fonksiyonlar:

- `setAuthCookies`: access ve refresh token'lari HTTP-only cookie olarak yazar.
- `setMfaChallengeCookie`: MFA login challenge token'ini `/mfa/giris-yap` path'i icin yazar.
- `getMfaChallengeCookie`: MFA challenge token okur.
- `getAccessToken`: access token okur.
- `getRefreshToken`: refresh token okur.
- `clearAuthCookies`: access ve refresh token'lari siler.
- `clearMfaChallengeCookie`: MFA challenge cookie'sini siler.

Auth cookie ayarlari:

- `httpOnly: true`
- `secure: NODE_ENV === "production"`
- `sameSite: "lax"`
- `path: "/"`
- Expire degerleri backend token expire zamanlarindan gelir.

### `src/shared/lib/auth/pending-verification-cookie.ts`

Email dogrulama bekleyen kullanici icin cookie yonetir.

Cookie:

- Isim: `pending_email_verification`
- Icerik: `{ userId, email }`
- JSON base64url olarak saklanir.
- `httpOnly: true`
- `maxAge: 30 dakika`

Fonksiyonlar:

- `setPendingVerificationCookie`
- `getPendingVerificationCookie`
- `clearPendingVerificationCookie`

### `src/shared/lib/auth/recovery-codes-cookie.ts`

MFA recovery code'larini gecici olarak saklar.

Cookie:

- Isim: `mfa_recovery_codes`
- Path: `/mfa/kodlar`
- TTL: 5 dakika
- `iron-session` `sealData` / `unsealData` kullanir.
- `RECOVERY_CODES_COOKIE_SECRET` en az 32 karakter olmalidir.

Fonksiyonlar:

- `setRecoveryCodesCookie`
- `getRecoveryCodesFromCookie`
- `clearRecoveryCodesCookie`

### `src/shared/lib/auth/mask-email.ts`

Email adresinin local-part kisminda ilk iki karakteri gorunur birakir, kalan kismi `*` ile maskeler. Gecersiz email biciminde orijinal degeri dondurur.

### `src/shared/lib/auth/verify-email.ts`

Backend `/api/auth/verify-email` endpoint'ine token ile POST atar. Basariliysa dogrulama mesajini, basarisizsa gecersiz/suresi dolmus baglanti mesajini dondurur.

### `src/shared/lib/auth/verify-password.ts`

Backend `/api/auth/verify-password` endpoint'ine token ile POST atar. Sifre sifirlama linkinin gecerliligini dogrulamak icin tasarlanmistir.

## 12. Form Validation Yardimcilari

### `src/shared/lib/validation/form-validation.ts.ts`

FormData ve Zod arasinda ortak validasyon katmanidir.

`formDataToObject`:

- FormData'yi object'e cevirir.
- Ayni isimle birden fazla alan varsa varsayilan olarak array saklar.
- Bos stringleri varsayilan olarak `undefined` kabul edip objeye eklemez.

`validateFormData`:

- Gelen FormData'yi object'e cevirir.
- Zod schema ile `safeParse` yapar.
- Basarisiz olursa field error ve form error dondurur.
- Basarili olursa parse edilmis data dondurur.

Not: Dosya adi `.ts.ts` bicimindedir ve proje import'lari bunu `form-validation.ts` seklinde alias uzerinden kullanmaktadir.

## 13. Proxy ve Route Koruma

### `src/proxy.ts`

Bu dosya Next proxy/middleware benzeri route koruma katmanidir.

Auth-only rotalar:

- `/giris-yap`
- `/kayit-ol`
- `/sifremi-unuttum`
- `/sifremi-sifirla`
- `/mfa/giris-yap`

Protected rotalar:

- `/ai-basla`
- `/ai-analysis`
- `/dosya-yukle`
- `/satir-giris`
- `/mfa/kurulum`
- `/mfa/kurulum-basla`
- `/mfa/kurulum-tamamla`
- `/mfa/kodlar`
- `/profil`

Davranis:

- Access token yok ama refresh token varsa `requestTokenRefresh` ile token yeniler.
- Yenilenen token'lari hem request cookie'sine hem response cookie'sine yazar.
- Authenticated kullanici auth-only sayfaya giderse `/` adresine redirect edilir.
- Anonymous kullanici protected sayfaya giderse `/giris-yap` adresine redirect edilir.
- Refresh basarisiz olursa auth cookie'leri temizlenir.

Matcher:

- `/api`, `_next/static`, `_next/image`, `favicon.ico` disindaki rotalarda calisir.
- Prefetch header'lari varsa calismaz.

## 14. Ana Sayfa Feature'i

### `src/features/home`

Ana sayfa, kullanicinin auth durumuna gore farkli icerik gosterir.

`HomePage`:

- `getAccessToken()` ile auth durumunu server tarafinda kontrol eder.
- Authenticated kullanici icin:
  - `AISection`
  - `CapabilitiesSection`
  - `WorkflowAndInsightsSection`
  - `DataEntrySection`
- Anonymous kullanici icin:
  - `HeroSection`
  - `FinalCtaSection`
  - `CapabilitiesSection`
  - `WorkflowAndInsightsSection`
  - `DataEntrySection`

Ana sayfa icerikleri:

- Hero: FinPilot AI'i finans asistani olarak tanitir.
- AISection: kategorilendirme, anomali, tahmin, taksit risk analizi, kalite metrikleri, sohbet asistani.
- Capabilities: akilli kategorilendirme, anomali tespiti, harcama tahmini.
- Workflow: ekstreyi ekle, AI analizini baslat, sohbetle sorgula.
- DataEntry: manuel giris ve dosya yukleme secenekleri.
- Final CTA: kayit olma yonlendirmesi.

## 15. Auth Feature'i

Auth modulleri `src/features/auth` altinda yer alir.

### 15.1 Login

Dosyalar:

- `src/features/auth/login/actions.ts`
- `src/features/auth/login/schema.ts`
- `src/features/auth/login/types/login.types.ts`
- `src/features/auth/login/components/login-form-card.tsx`
- `src/features/auth/login/components/login-page-view.tsx`

Login form alanlari:

- `email`
- `password`

Validasyon:

- Email gecerli formatta, 1-320 karakter.
- Password 1-200 karakter.

Akis:

1. `LoginFormCard` client component olarak formu gosterir.
2. Form `loginAction` server action'ina gider.
3. `validateFormData(loginSchema, formData)` calisir.
4. Basarisizsa field error'lar dondurulur.
5. Basariliysa `routeApi` ile `/api/auth/login` route handler'ina POST atilir.
6. Route handler backend `/api/auth/login` endpoint'ine `serverApi` ile gider.
7. Backend response sonucuna gore:
   - `user.isActive === false`: hata mesaji dondurulur.
   - `emailVerified === false`: pending verification cookie yazilir ve `/email-dogrula` adresine redirect edilir.
   - `requiresMfa === true`: MFA challenge cookie yazilir ve `/mfa/giris-yap` adresine redirect edilir.
   - Aksi halde auth cookie'leri yazilir ve `/mfa/kurulum` adresine redirect edilir.

Login response tipi:

- `user.id`
- `user.email`
- `user.emailVerified`
- `user.isActive`
- `tokens.accessToken`
- `tokens.accessTokenExpiresAtUtc`
- `tokens.refreshToken`
- `tokens.refreshTokenExpiresAtUtc`
- `mfaChallenge`
- `requiresMfa`

### 15.2 Register

Dosyalar:

- `src/features/auth/register/actions.ts`
- `src/features/auth/register/schema.ts`
- `src/features/auth/register/types/register.types.ts`
- `src/features/auth/register/components/register-form-card.tsx`
- `src/features/auth/register/components/register-page-view.tsx`

Form alanlari:

- `email`
- `password`

Sifre kurallari:

- En az 12 karakter.
- En fazla 200 karakter.
- En az bir buyuk harf.
- En az bir kucuk harf.
- En az bir sayi.
- En az bir ozel karakter.

Akis:

1. Kullanici `/kayit-ol` sayfasindaki formu doldurur.
2. `registerAction` validasyon yapar.
3. `/api/auth/register` route handler'ina POST atilir.
4. Handler backend `/api/auth/register` endpoint'ine gider.
5. Kullanici email dogrulamamis olarak donerse pending verification cookie yazilir ve `/email-dogrula` adresine redirect edilir.
6. Aksi halde `/` adresine redirect edilir.

### 15.3 Email Dogrulama

Sayfalar:

- `/email-dogrula`
- `/verify-email`

`/email-dogrula`:

- `getPendingVerificationCookie()` ile pending user okunur.
- Cookie yoksa `/giris-yap` adresine redirect edilir.
- `EmailVerificationInfo` gosterilir.
- Kullanici dogrulama mailini tekrar gondermek icin formu kullanabilir.

`sendAgainEmailVerificationAction`:

- Pending verification cookie'den email okur.
- Cookie yoksa hata dondurur.
- `/api/auth/email-verification/send-again` route handler'ina POST atar.

`/verify-email`:

- URL `token` query parametresi bekler.
- Token yoksa hata ekrani gosterir.
- `verifyEmail(token)` backend dogrulama istegi yapar.
- Basariliysa email dogrulandi ekrani gosterir.
- Basarisizsa gecersiz baglanti ekrani gosterir.

### 15.4 Sifremi Unuttum ve Reset Password

`/sifremi-unuttum`:

- Email formu gosterir.
- `forgotPasswordAction` email validasyonu yapar.
- `/api/auth/forgot-password` route handler'ina POST atar.
- Handler backend `/api/auth/forgot-password` endpoint'ine gider.

`/reset-password`:

- URL'de `token` query parametresi bekler.
- Token yoksa gecersiz baglanti ekrani gosterir.
- `ResetPasswordForm` token'i hidden input olarak gonderir.
- `resetPasswordAction` `token` ve `newPassword` validasyonu yapar.
- Backend `/api/auth/reset-password` endpoint'ine `serverApi` ile POST atar.
- Basariliysa `/giris-yap` adresine redirect eder.

### 15.5 Logout ve Logout All

`logoutAction`:

- `getAccessToken()` ile token okur.
- `/api/auth/logout` route handler'ina POST atar.
- Basariliysa auth cookie'leri temizler.
- `/giris-yap` adresine redirect eder.

`logoutAllAction`:

- `/api/auth/logout-all` route handler'ina POST atar.
- Basariliysa auth cookie'leri temizler.
- `/giris-yap` adresine redirect eder.

### 15.6 MFA

Dosyalar:

- `src/features/auth/mfa/actions.ts`
- `src/features/auth/mfa/schema.ts`
- `src/features/auth/mfa/types/mfa.types.ts`
- `src/features/auth/mfa/components/mfa-login-form.tsx`
- `src/features/auth/mfa/components/mfa-complate-form.tsx`
- `src/features/auth/mfa/components/mfa-setup-qr.tsx`

MFA kod validasyonu:

- `code` tam olarak 6 haneli sayisal string olmalidir.

MFA kurulum:

1. Kullanici `/mfa/kurulum` sayfasina gider.
2. Sayfa `createMfa()` server action'ini cagirir.
3. `createMfa`, access ve refresh token okur.
4. `/api/auth/mfa/create` route handler'ina POST atar.
5. Handler backend `/api/mfa/setup/begin` endpoint'ine gider.
6. `manualEntryKey` ve `otpAuthUri` doner.
7. QR kod `QRCodeSVG` ile gosterilir.
8. Kullanici 6 haneli kodu girer.
9. `mfaComplateAction` `/api/auth/mfa/complate` route handler'ina POST atar.
10. Handler backend `/api/mfa/setup/complete` endpoint'ine gider.
11. Recovery code'lar cookie'ye 5 dakika icin yazilir.
12. Kullanici `/mfa/kodlar` adresine redirect edilir.

MFA giris:

1. Login response `requiresMfa` dondururse MFA challenge cookie yazilir.
2. Kullanici `/mfa/giris-yap` adresine gider.
3. `mfaLoginAction` challenge token'i cookie'den okur.
4. `{ challengeToken, totpCode, recoveryCode: null }` body ile `/api/auth/mfa/login` route handler'ina gider.
5. Handler backend `/api/mfa/login/complete` endpoint'ine gider.
6. Basariliysa auth cookie'leri yazilir, challenge cookie silinir ve `/` adresine redirect edilir.

### 15.7 Profil

`/profil` client sayfasidir.

- `useProfile()` hook'u ile profil bilgisi alinir.
- Email ve avatar initial gosterilir.
- Guvenlik kartlari:
  - Mail bildirimleri
  - Iki adimli dogrulama
  - Oturum kontrolu
- MFA kurulum linki gosterilir.
- Tum oturumlari kapatma formu gosterilir.

## 16. User Feature'i

### `src/features/user/actions.ts`

`getProfileAction`:

- Access token ve refresh token okur.
- `/api/users/me` route handler'ina GET atar.
- Authorization header: `Bearer <accessToken>`.
- Refresh token `Refresh-Token` header'i olarak routeApi'ye verilir.
- Basariliysa `UserProfile` dondurur.
- Basarisizsa status ve error dondurur.

### `src/features/user/types/user.types.ts`

`UserProfile` alanlari:

- `userId`
- `email`
- `sessionId`
- `accessTokenJti`
- `permissions`

### `src/shared/hooks/profile.ts`

Client hook'tur.

- `getProfileAction` cagirir.
- `profile`, `isLoading`, `error`, `refetch` dondurur.
- Component unmount olduktan sonra state update yapmamak icin `isMountedRef` kullanir.

## 17. Analysis Feature'i

Analysis modulu uc ana parcadan olusur:

- Dosya yukleme ve veri cikarma: `ai-upload`
- AI analiz baslatma ve sonuc tipleri: `ai-analysis`
- Chatbot: `chatbot`

## 18. Dosya Yukleme Akisi

### `/dosya-yukle`

Sayfa: `src/app/(analysis)/dosya-yukle/page.tsx`

Client component'tir.

Davranis:

- `useProfile()` ile kullanici profili alinir.
- Profildeki `userId` hidden input olarak forma eklenir.
- Kullanici `.png`, `.jpg`, `.jpeg`, `.pdf` dosyasi secer.
- Dosya secilince dosya adi UI'da gosterilir.
- `uploadTransactionFileAction` form action olarak kullanilir.
- Basarili response sessionStorage'a `dosya-yukle-result` anahtariyla yazilir.
- Ardindan `/dosya-yukle/veriler` adresine gidilir.

Desteklenen dosya aciklamalari:

- Ekran goruntusu
- Dokuman fotografi
- Taranmis dokuman PDF
- Gercek PDF

### `uploadTransactionFileAction`

Dosya: `src/features/analysis/ai-upload/actions.ts`

Validasyon:

- `file` gercek bir `File` olmali ve `size > 0` olmali.
- `user_id` bos olmamali.

Akis:

1. Access ve refresh token okunur.
2. Yeni `FormData` olusturulur.
3. `user_id` ve `file` eklenir.
4. `routeApi` ile `/api/transactions/file-input` route handler'ina POST atilir.
5. Handler backend `/api/transactions/file-input` endpoint'ine `serverApi` ile FormData gonderir.
6. Basariliysa `UploadFileData` dondurulur.

### Upload tipleri

`UploadFileData`:

- `response`
  - `input_id`
  - `status`
  - `classification`
  - `next_stage`
- `file`
  - `fileName`
  - `contentType`
  - `size`
  - `uploadedAt`

`ClassificationResponse`:

- `kind`
- `confidence`
- `needs_ocr`
- `needs_preprocessing`
- `routing_key`
- `features`
- `warnings`
- `model_version`

`FeaturesResponse` belge/goruntu sinyalleri tasir:

- mime type
- EXIF bilgisi
- image width/height
- aspect ratio
- blur score
- edge density
- document contour sinyalleri
- quadrilateral count
- axis aligned line score

## 19. Yuklenen Dosya Onizleme ve Veri Cikarma

### `/dosya-yukle/veriler`

Sayfa: `src/app/(analysis)/dosya-yukle/veriler/page.tsx`

Davranis:

- `sessionStorage` icinden `dosya-yukle-result` okur.
- JSON parse edemezse data `null` olur.
- Dosya bilgilerini gosterir:
  - Dosya adi
  - Dosya turu
  - Dosya boyutu
  - Yuklenme tarihi
- Data yoksa kullaniciyi `/dosya-yukle` sayfasina yonlendiren uyari gosterir.
- `Verileri Cikar` butonu `extractTransactionDataAction` cagirir.
- Basarili extract response sessionStorage'a `dosya-yukle-veriler-result` anahtariyla yazilir.
- Ardindan `/satir-giris` adresine gidilir.

### `extractTransactionDataAction`

Validasyon:

- `inputId` bos olmamali.

Akis:

1. Access ve refresh token okunur.
2. `/api/transactions/extract` route handler'ina POST atilir.
3. Body:
   - `input_id`
   - `file_name`
4. Handler backend `/api/transactions/file-extract` endpoint'ine gider.
5. Backend yeni yuklenen dosyayi hemen hazirlamamis olabilir diye 3 deneme yapilir.
6. Denemeler arasi gecikmeler:
   - 800 ms
   - 1500 ms
7. Basariliysa extract data dondurulur.
8. Tum denemeler basarisizsa hata mesaji dondurulur.

### Extract tipleri

`ExtractedDataResponse`:

- `response.input_id`
- `response.status`
- `response.result`
- `response.scores`
- `response.warnings`

`Transaction`:

- `transaction_id`
- `date`
- `description`
- `merchant`
- `amount`
- `currency`
- `original_amount`
- `original_currency`
- `direction`: `credit | debit | null`
- `installment`
- `source`
- `confidence`
- `validation_status`
- `warnings`

`Merchant`:

- `raw`
- `normalized`
- `display_name`
- `confidence`

`Installment`:

- `current`
- `total`
- `raw`
- `unit_amount`
- `total_amount`

`Summary`:

- transaction count
- duplicate removed count
- total debit/credit
- net amount
- currencies
- primary currency
- low confidence count
- invalid count
- warning count
- average confidence

## 20. Manuel Satir Girisi

### `/satir-giris`

Sayfa: `src/app/(analysis)/satir-giris/page.tsx`

Client component'tir.

Ana state'ler:

- `rows`: transaction satirlari.
- `openInstallments`: hangi satirlarda taksit formunun acik oldugu.
- `purchaseScenario`: taksitli urun alim tavsiyesi icin senaryo.

Varsayilan transaction satiri:

- `transaction_id`: random uretilir.
- `date`: bos.
- `description`: bos.
- `merchant.normalized`: bos.
- `amount`: bos.
- `currency`: `TRY`.
- `direction`: `debit`.
- `installment`: tum alanlar `null`.

Sayfa ilk acildiginda:

- `sessionStorage` icindeki `dosya-yukle-veriler-result` okunur.
- Extract edilmis transaction varsa satirlar bunlardan doldurulur.
- Taksit bilgisi olan satirlarda taksit paneli otomatik acilir.
- Data yoksa bos bir satirla baslar.

Transaction satirinda alanlar:

- Tarih
- Aciklama
- Satici
- Tutar
- Para birimi
- Yon: `debit` veya `credit`

Taksit paneli alanlari:

- Mevcut taksit donemi
- Toplam taksit sayisi
- Aylik taksit tutari
- Toplam tutar

Taksitli urun alim tavsiyesi alanlari:

- Toplam fiyat
- Para birimi
- Maksimum taksit ay sayisi

Kullanici islemleri:

- Yeni satir ekleyebilir.
- Var olan satiri silebilir; tek satir kaldiysa silme disabled olur.
- Taksit bilgisi panelini acip kapatabilir.
- Analizi baslatabilir.
- `/ai-basla` sayfasina geri donebilir.

Form submit:

- `transactions` hidden input olarak JSON stringify edilir.
- `purchase_scenario` hidden input olarak JSON stringify edilir.
- `startAnalysisAction` server action'ina gonderilir.

## 21. AI Analiz Baslatma

### `src/features/analysis/ai-analysis/actions.ts`

`startAnalysisAction`:

1. Access token ve refresh token okur.
2. FormData'dan `transactions` ve `purchase_scenario` alanlarini alir.
3. JSON parse eder.
4. `aiAnalysisSchema` ile validasyon yapar.
5. Validasyon basarisizsa kullaniciya okunabilir hata listesi dondurur.
6. Backend'e gonderilecek payload'u olusturur.
7. `routeApi` ile `/api/transactions/ai` route handler'ina POST atar.
8. Handler backend `/api/transactions/ai-save` endpoint'ine gider.
9. Basariliysa `AnalysisResponse` dondurulur.

Payload yapisi:

- `input_id`: random uretilir.
- `status`: `completed`
- `result.transactions`
- `result.summary.primary_currency`: `TRY`
- `result.summary.average_confidence`: `1.00`
- `scores.summary.overall_confidence`: `1.00`
- `historical_transactions`
- `question`: `En cok harcama yapilan kategori ney?`
- `purchase_scenario`
- `use_llm`: `true`

### `src/features/analysis/ai-analysis/schema.ts`

Transaction validasyonu:

- `transaction_id`: bos olamaz.
- `date`: bos olamaz.
- `description`: bos olamaz.
- `merchant.normalized`: bos olamaz.
- `amount`: sayisal ve pozitif olmali.
- `currency`: 1-3 karakter.
- `direction`: `debit` veya `credit`.

Purchase scenario validasyonu:

- `amount`: sayisal ve pozitif.
- `currency`: 1-3 karakter.
- `max_installment_months`: integer, 1-36 arasi.

Genel validasyon:

- En az bir transaction satiri zorunludur.

## 22. AI Analiz Sonucu

### `/ai-analysis`

Sayfa: `src/app/(analysis)/ai-analysis/page.tsx`

Client component'tir.

Davranis:

- `sessionStorage` icinden `ai-analysis-result` okur.
- Data varsa analiz raporunu gosterir.
- Data yoksa kullaniciyi `/satir-giris` sayfasina yonlendiren uyari gosterir.
- `analysis.analysis_id` varsa chatbot component'i gosterilir.

Ust rapor kartlari:

- Durum
- Executive summary satirlari
- Ana harcama kategorisi
- Gelecek ay tahmini harcama
- Onerilen taksit

Alt rapor bilesenleri:

- `QualityMetrics`
- `TransactionTable`
- `CategorySummary`
- `AnomalyAiComment`
- `InstallmentOptions`

Kodda import edilen ama sayfa render'inda kullanilmayan bilesenler:

- `AssistantAnswer`
- `EngineInfo`

Bu dokumantasyon mevcut davranisi anlatir; kullanilmayan import'lar proje kodunun mevcut durumudur.

## 23. AI Analiz Tipleri

### `AnalysisResponse`

Ana yapi:

- `response.input_id`
- `response.analysis_id`
- `response.status`
- `response.result`
- `response.quality`
- `response.engine`
- `response.warnings`

### `AnalysisResult`

Alanlar:

- `categorization`
- `spending_profile`
- `anomalies`
- `forecast`
- `installment_recommendation`
- `assistant`
- `executive_summary`

### Categorization

`CategorizationResult`:

- `transactions`
- `summary`
- `uncategorized_count`
- `rule_assisted_count`
- `embedding_assisted_count`
- `llm_assisted_count`

`CategorySummaryItem`:

- `category`
- `transaction_count`
- `total_amount`
- `share_of_spend`

### Spending Profile

Alanlar:

- `labels`
- `primary_category`
- `primary_category_share`
- `installment_transaction_ratio`
- `foreign_currency_transaction_ratio`
- `average_transaction_amount`
- `largest_transaction_amount`
- `observations`

### Anomaly

Alanlar:

- `anomaly_count`
- `method`
- `items`
- `observations`
- `llm_explanation`
- `explanation_method`

`AnomalyItem`:

- `transaction_id`
- `anomaly_type`
- `severity`
- `score`
- `message`
- `amount`
- `currency`
- `merchant`

### Forecast

Alanlar:

- `status`
- `method`
- `historical_month_count`
- `predicted_next_month_spend`
- `currency`
- `confidence`
- `observations`

### Installment Recommendation

Alanlar:

- `status`
- `requested_amount`
- `currency`
- `baseline_monthly_spend`
- `forecast_monthly_spend`
- `forecast_method`
- `recommended_months`
- `options`
- `explanation`
- `explanation_method`
- `warnings`

`InstallmentOption`:

- `months`
- `monthly_amount`
- `monthly_burden_ratio`
- `risk_level`

### Assistant

Alanlar:

- `question`
- `answer`
- `intent`
- `generation_method`

### Quality

Alanlar:

- `source_overall_confidence`
- `usable_transaction_count`
- `low_confidence_transaction_count`
- `invalid_transaction_count`
- `analysis_confidence`
- `warnings`

### Engine

Alanlar:

- `analysis_version`
- `llm_enabled`
- `llm_available`
- `llm_model`
- `embedding_enabled`
- `embedding_model`
- `anomaly_method`
- `forecast_method`

## 24. Analiz Sonucu Bilesenleri

### `QualityMetrics`

Kalite metriklerini gosterir:

- Genel guven
- Gecerli transaction
- Dusuk guvenli transaction
- Gecersiz transaction
- Analiz guven skoru

### `TransactionTable`

Analiz edilen harcamalari kartlar halinde gosterir.

Her kartta:

- Merchant
- Tutar ve para birimi
- Kategori
- Guven skoru

Merchant string veya object olabilir; `resolveMerchant` sirasiyla `display_name`, `normalized`, `raw` degerlerini kullanir.

### `CategorySummary`

Kategori ozetini gosterir. Summary yoksa bos durum mesaji verir. Summary varsa `CategoryCircleChart` kullanir.

### `CategoryCircleChart`

Client component'tir. Recharts ile donut/pie chart cizer.

Ozellikleri:

- Kategorilere sabit renk paleti atar.
- Tooltip kullanir.
- Ortada toplam TRY tutarini gosterir.
- Altta kategori legend/list gosterir.
- Hover edilen dilim disindaki dilimleri opacity ile geri plana alir.

### `AnomalyAiComment`

Anomali sayisini, anomali item'larini ve varsa LLM aciklamasini gosterir.

Her anomali kartinda:

- Mesajdan turetilen kisa baslik.
- Merchant.
- Tutar.
- Seviye.
- Skor.

### `InstallmentOptions`

Taksit onerilerini gosterir.

Gosterilen bilgiler:

- Talep edilen tutar.
- Ongoru aylik harcama.
- Onerilen taksit sayisi.
- Her taksit secenegi icin:
  - Ay sayisi
  - Aylik odeme
  - Yuk orani
  - Risk seviyesi

### `AssistantAnswer`

Asistanin ilk soru/cevap sonucunu kart olarak gostermek icin yazilmis bilesendir. Mevcut `/ai-analysis` sayfasinda import edilmis ancak render edilmemistir.

### `EngineInfo`

Analiz motoru metadata ve warning bilgilerini gostermek icin yazilmis bilesendir. Mevcut `/ai-analysis` sayfasinda import edilmis ancak render edilmemistir.

## 25. Chatbot

### `src/features/analysis/chatbot/components/chatbot.tsx`

Client component'tir.

Props:

- `analysisId`
- `assistant`

Davranis:

- Sag altta sabit bir buton gosterir.
- Buton ile chatbot paneli acilip kapanir.
- Ilk assistant cevabi varsa messages state'ine eklenir.
- Kullanici soru yazip gonderebilir.
- `sendChatMessageAction` cagrilir.
- Basarili cevap assistant mesaji olarak listeye eklenir.
- Hata olursa hata mesaji gosterilir.

Mesaj tipi:

- `id`
- `role`: `user` veya `assistant`
- `text`
- opsiyonel `meta`

### `sendChatMessageAction`

Dosya: `src/features/analysis/chatbot/actions.ts`

Validasyon:

- `analysis_id` bos olmamali.
- `question` trim sonrasi bos olmamali.

Akis:

1. Access ve refresh token okunur.
2. `/api/transactions/chat` route handler'ina POST atilir.
3. Handler backend `/api/transactions/ai-chat` endpoint'ine gider.
4. Basariliysa chatbot response dondurulur.

Chat response:

- `response.answer`
- `response.intent`
- `response.generation_method`

## 26. Next API Route Handler'lari

Route handler'lar `src/app/api` altinda yer alir. Bunlar frontend ile backend arasinda proxy/BFF gorevi gorur.

### Auth route handler'lari

| Next Route | Method | Backend Endpoint | Aciklama |
| --- | --- | --- | --- |
| `/api/auth/login` | POST | `/api/auth/login` | Login credentials backend'e iletilir. |
| `/api/auth/register` | POST | `/api/auth/register` | Register body backend'e iletilir. |
| `/api/auth/forgot-password` | POST | `/api/auth/forgot-password` | Sifre yenileme maili istegi. |
| `/api/auth/refresh` | POST | `/api/auth/refresh` | Refresh token ile yeni token alir ve cookie yazar. |
| `/api/auth/logout` | POST | `/api/auth/logout` | Authorization header ile logout yapar. |
| `/api/auth/logout-all` | POST | `/api/auth/logout-all` | Tum oturumlari kapatir. |
| `/api/auth/email-verification/send-again` | POST | `/api/auth/resend-verification` | Email dogrulama linkini yeniden gonderir. |
| `/api/auth/mfa/create` | POST | `/api/mfa/setup/begin` | MFA kurulum baslatir. |
| `/api/auth/mfa/complate` | POST | `/api/mfa/setup/complete` | MFA kurulum kodunu tamamlar. |
| `/api/auth/mfa/login` | POST | `/api/mfa/login/complete` | MFA login adimini tamamlar. |

Not: Kodda `complate` yazimi route ve dosya adlarinda bu sekilde kullanilmistir; dokumantasyon mevcut ismi korur.

### User route handler'i

| Next Route | Method | Backend Endpoint | Aciklama |
| --- | --- | --- | --- |
| `/api/users/me` | GET | `/api/users/me` | Authenticated kullanici profilini getirir. |

### Transaction route handler'lari

| Next Route | Method | Backend Endpoint | Aciklama |
| --- | --- | --- | --- |
| `/api/transactions/file-input` | POST | `/api/transactions/file-input` | Dosya ve user_id FormData olarak backend'e iletilir. |
| `/api/transactions/extract` | POST | `/api/transactions/file-extract` | Upload input_id uzerinden transaction cikarma. |
| `/api/transactions/ai` | POST | `/api/transactions/ai-save` | AI analiz baslatma/kaydetme. |
| `/api/transactions/chat` | POST | `/api/transactions/ai-chat` | Analiz uzerinden chatbot sorusu. |

### Route handler ortaklari

- Cogu handler `Authorization` header'ini frontend action'dan alip backend'e tasir.
- Refresh gereken route'larda `Refresh-Token` header'i okunur ve `serverApi` icin `refreshToken` olarak verilir.
- `authRetry: true` kullanilan backend isteklerinde 401 durumunda refresh denenir.
- Response'lar genellikle `NextResponse.json(response, { status: response.status })` ile frontend'e aynen dondurulur.

## 27. Sayfa Haritasi

| URL | Dosya | Amac |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | HomePage render eder. |
| `/giris-yap` | `src/app/(auth)/giris-yap/page.tsx` | Login sayfasi. |
| `/kayit-ol` | `src/app/(auth)/kayit-ol/page.tsx` | Register sayfasi. |
| `/email-dogrula` | `src/app/(auth)/email-dogrula/page.tsx` | Email dogrulama bekleme ve resend. |
| `/verify-email` | `src/app/(auth)/verify-email/page.tsx` | Token ile email dogrulama sonucu. |
| `/sifremi-unuttum` | `src/app/(auth)/sifremi-unuttum/page.tsx` | Sifre yenileme maili isteme. |
| `/reset-password` | `src/app/(auth)/reset-password/page.tsx` | Token ile yeni sifre belirleme. |
| `/profil` | `src/app/(auth)/profil/page.tsx` | Profil ve guvenlik islemleri. |
| `/mfa/giris-yap` | `src/app/(auth)/mfa/giris-yap/page.tsx` | MFA login kodu girisi. |
| `/mfa/kurulum` | `src/app/(auth)/mfa/kurulum/page.tsx` | MFA setup QR ve manuel key. |
| `/mfa/kodlar` | `src/app/(auth)/mfa/kodlar/page.tsx` | Recovery code gosterimi. |
| `/ai-basla` | `src/app/(analysis)/ai-basla/page.tsx` | Analiz baslangic secimi. |
| `/dosya-yukle` | `src/app/(analysis)/dosya-yukle/page.tsx` | Dosya yukleme. |
| `/dosya-yukle/veriler` | `src/app/(analysis)/dosya-yukle/veriler/page.tsx` | Yuklenen dosya bilgisi ve extract. |
| `/satir-giris` | `src/app/(analysis)/satir-giris/page.tsx` | Manuel/duzenlenebilir transaction girisi. |
| `/ai-analysis` | `src/app/(analysis)/ai-analysis/page.tsx` | AI analiz raporu ve chatbot. |
| Bilinmeyen route | `src/app/not-found.tsx` | 404 ekrani. |
| Runtime error | `src/app/error.tsx` | Client error boundary ekrani. |

## 28. Hata ve Bos Durum Ekranlari

### `src/app/not-found.tsx`

404 durumunda kullaniciya sayfanin bulunamadigini soyler ve ana sayfaya donus linki verir.

### `src/app/error.tsx`

Client error boundary'dir.

- `reset()` butonu ile tekrar deneme sunar.
- Ana sayfaya git linki vardir.
- `error.digest` varsa hata kodu olarak gosterir.

### Analiz bos durumlari

- `/dosya-yukle/veriler`: sessionStorage'da upload data yoksa dosya yukleme ekranina yonlendirir.
- `/ai-analysis`: sessionStorage'da analysis data yoksa satir giris ekranina yonlendirir.
- Kategori, transaction, anomali ve taksit bilesenleri kendi bos durum mesajlarini gosterir.

## 29. SessionStorage Kullanimi

Analiz akisi tarayici sessionStorage uzerinden adimlar arasi veri tasir.

| Key | Kaynak | Hedef | Icerik |
| --- | --- | --- | --- |
| `dosya-yukle-result` | `/dosya-yukle` | `/dosya-yukle/veriler` | UploadFileData |
| `dosya-yukle-veriler-result` | `/dosya-yukle/veriler` | `/satir-giris` | ExtractedDataResponse |
| `ai-analysis-result` | `/satir-giris` | `/ai-analysis` | AnalysisResponse |

Bu veriler tarayici oturumu boyunca saklanir. Sayfa yenileme ayni tab icinde veriyi koruyabilir; baska tab veya yeni session icin garanti yoktur.

## 30. Gorsel Sistem ve UI Yaklasimi

UI genel olarak:

- Tailwind utility class'lariyla yazilmistir.
- Card tabanli paneller kullanir.
- Light/dark tema destekler.
- Cam efekti icin `bg-white/80`, `backdrop-blur-md`, border ve shadow siniflari yaygindir.
- Finans/AI temasi icin cyan, indigo, violet, fuchsia, emerald, amber ve rose tonlari kullanilir.
- Header sticky'dir.
- Ana container genellikle `max-w-6xl`, analiz sonucu `max-w-7xl` kullanir.
- Formlarda rounded input ve focus ring kullanilir.

### Chart altyapisi

`components/ui/chart.tsx`:

- shadcn chart pattern'ini Recharts ile uygular.
- `ChartContainer`, `ChartTooltip`, `ChartTooltipContent` gibi export'lar sunar.
- CSS variable tabanli renk konfigurasyonu destekler.
- `ResponsiveContainer` icin `initialDimension` varsayilani `{ width: 320, height: 200 }`.

## 31. Test Altyapisi

### Vitest

`vitest.config.mts`:

- `jsdom` test ortami.
- `tests/setup.ts` setup file.
- Unit ve integration testleri include edilir.
- Coverage provider `v8`.

### MSW

`tests/msw/server.ts`:

- `setupServer(...handlers)` ile node MSW server kurar.

`tests/setup.ts`:

- `beforeAll`: MSW listen, unhandled request `error`.
- `afterEach`: Testing Library cleanup ve MSW reset handlers.
- `afterAll`: server close.

`tests/msw/handlers.ts`:

- Backend mock URL'i: `http://backend.test`
- Local Next route mock URL'i: `http://localhost:3000`
- Mock edilen akislardan bazilari:
  - Login
  - Register
  - Profile
  - Chat
  - File input
  - File extract
  - AI save
  - MFA setup begin

### Fixture'lar

`tests/fixtures/finance.ts`:

- `uploadFileData`
- `extractedDataResponse`
- `analysisResponse`

Bu fixture'lar dosya yukleme, transaction extract ve analiz dashboard testlerinde kullanilir.

### Unit testler

| Dosya | Kapsam |
| --- | --- |
| `tests/unit/mask-email.test.ts` | Email maskeleme. |
| `tests/unit/form-validation.test.ts` | FormData object'e cevirme ve Zod hata donusu. |
| `tests/unit/login-form-card.test.tsx` | Login form alanlari, linkler, sifre gorunurluk toggle. |
| `tests/unit/register-form-card.test.tsx` | Register alanlari, sifre aciklamasi, toggle. |
| `tests/unit/mfa-flow.test.tsx` | MFA login input, setup QR fallback ve confirm form. |
| `tests/unit/upload-page.test.tsx` | Profil yokken upload disabled, dosya secilince isim gosterimi. |
| `tests/unit/analysis-dashboard.test.tsx` | sessionStorage'dan analiz raporu render'i ve missing data bos durumu. |

### Integration testler

| Dosya | Kapsam |
| --- | --- |
| `tests/integration/route-api.test.ts` | routeApi login, hata yuzeye cikarma, chat request. |
| `tests/integration/server-actions.test.ts` | Login validation, upload validation, MFA validation, analysis validation. |
| `tests/integration/next-route-handlers.test.ts` | Next route handler'larinin backend MSW'e dogru gitmesi. |
| `tests/integration/proxy-auth.test.ts` | Protected route redirect, auth-only redirect, refresh cookie akisi. |

### E2E testler

`playwright.config.ts`:

- Test directory: `tests/e2e`
- Base URL: `http://localhost:3000`
- Web server: `npm run build && npm run start`
- Browser projeleri:
  - Chromium
  - Firefox
  - WebKit

E2E test dosyalari:

| Dosya | Kapsam |
| --- | --- |
| `tests/e2e/home.spec.ts` | Home -> login navigasyonu, login -> register gecisi. |
| `tests/e2e/protected-routes.spec.ts` | Anonymous protected redirect, auth cookie ile login'den uzaklastirma, MFA login formu. |
| `tests/e2e/accessibility.spec.ts` | Home sayfada kritik accessibility violation olmamasi; color contrast rule disabled. |

## 32. Guvenlik ve Oturum Notlari

Projede onemli guvenlik tercihleri:

- Access ve refresh token HTTP-only cookie'de tutulur.
- Production ortaminda cookie'ler secure olur.
- SameSite `lax` kullanilir.
- Route korumasi proxy katmaninda yapilir.
- Access token yokken refresh token varsa sessiz yenileme denenir.
- MFA challenge token ayri path'e scope edilir: `/mfa/giris-yap`.
- Recovery code'lar 5 dakika yasayan, sealed cookie icinde saklanir.
- Backend proxy route'lari Authorization header'i ile token tasir.

Dikkat edilmesi gereken mevcut davranislar:

- Logout route handler'larinda `authRetry: true` kullanilir ancak refresh token bazi handler'larda gecirilmez; mevcut kodun davranisi bu sekildedir.
- Email verification resend route handler'i backend response'unu kontrol etmeden basarili mesaj dondurur; mevcut davranis dokumante edilmistir.
- Chatbot component'inde `console.log(messages)` bulunur; mevcut kod davranisidir.
- `/ai-analysis` sayfasinda bazi kosullu ifadelerde operator precedence nedeniyle UI metinleri beklenenden farkli degerlendirebilir; bu dokuman kodu degistirmez, yalnizca mevcut yapidan bahseder.

## 33. Backend Bagimliliklari

Frontend tek basina tum finans analizini yapmaz; asagidaki backend endpoint'lerine bagimlidir:

Auth:

- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/forgot-password`
- `/api/auth/reset-password`
- `/api/auth/verify-email`
- `/api/auth/resend-verification`
- `/api/auth/refresh`
- `/api/auth/logout`
- `/api/auth/logout-all`

MFA:

- `/api/mfa/setup/begin`
- `/api/mfa/setup/complete`
- `/api/mfa/login/complete`

User:

- `/api/users/me`

Transactions / AI:

- `/api/transactions/file-input`
- `/api/transactions/file-extract`
- `/api/transactions/ai-save`
- `/api/transactions/ai-chat`

Frontend bu endpoint'lere genellikle kendi Next route handler'lari uzerinden gider.

## 34. Veri Akislari

### Kayit ve Email Dogrulama

1. Kullanici `/kayit-ol` formunu doldurur.
2. Register schema ile validasyon yapilir.
3. `/api/auth/register` Next route'u backend'e iletir.
4. Backend user doner.
5. Email dogrulanmamis ise `pending_email_verification` cookie yazilir.
6. Kullanici `/email-dogrula` sayfasina gider.
7. Resend formu gerekirse dogrulama linkini tekrar ister.
8. Email linki `/verify-email?token=...` adresine gelir.
9. Token backend'de dogrulanir.

### Login ve MFA

1. Kullanici `/giris-yap` formunu doldurur.
2. Backend login cevabi doner.
3. User pasifse hata verilir.
4. Email dogrulanmamissa `/email-dogrula`.
5. MFA gerekiyorsa challenge cookie yazilir ve `/mfa/giris-yap`.
6. MFA gerekmiyorsa token cookie'leri yazilir ve `/mfa/kurulum`.
7. MFA login kodu basariliysa token cookie'leri yazilir ve `/`.

### Dosya ile Analiz

1. Kullanici `/ai-basla` ekranindan dosya yuklemeyi secer.
2. `/dosya-yukle` sayfasinda dosya secilir.
3. Dosya `/api/transactions/file-input` uzerinden backend'e gider.
4. Upload sonucu sessionStorage'a yazilir.
5. `/dosya-yukle/veriler` dosya bilgisini gosterir.
6. `Verileri Cikar` backend extract endpoint'ini cagirir.
7. Extract sonucu sessionStorage'a yazilir.
8. `/satir-giris` extract edilen satirlari formda duzenlenebilir hale getirir.
9. Kullanici satirlari ve taksit senaryosunu kontrol eder.
10. `Analize Basla` backend AI save endpoint'ini cagirir.
11. Analiz sonucu sessionStorage'a yazilir.
12. `/ai-analysis` raporu gosterir.
13. Chatbot analiz ID'si ile sorulari backend chat endpoint'ine gonderir.

### Manuel Analiz

1. Kullanici `/ai-basla` ekranindan elle girisi secer.
2. `/satir-giris` bos satirla acilir.
3. Kullanici transaction satirlari ekler.
4. Taksit senaryosunu doldurur.
5. `Analize Basla` ayni `startAnalysisAction` akisini calistirir.
6. Sonuc `/ai-analysis` ekraninda gosterilir.

## 35. Import Alias ve Modul Organizasyonu

`tsconfig.json` icinde:

```json
"paths": {
  "@/*": ["./*"]
}
```

Bu nedenle import'lar proje kokune gore yazilir:

- `@/src/features/...`
- `@/src/shared/...`
- `@/components/ui/chart`
- `@/lib/utils`

Feature klasorleri genellikle su pattern'i izler:

- `actions.ts`
- `schema.ts`
- `types/*.types.ts`
- `components/*.tsx`
- `index.ts`

Ancak bazi `index.ts` dosyalari bostur veya sadece export yapar.

## 36. TypeScript Ayarlari

`tsconfig.json`:

- `strict: true`
- `noEmit: true`
- `jsx: react-jsx`
- `moduleResolution: bundler`
- `allowJs: true`
- `skipLibCheck: true`
- `incremental: true`
- Next plugin aktif.
- `.next/types`, `.next/dev/types`, TS/TSX/MTS dosyalari include edilir.
- `node_modules` exclude edilir.

## 37. Lint Ayarlari

`eslint.config.mjs`:

- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`
- Unit/integration testlerinde Testing Library flat React config.
- E2E testlerinde Playwright recommended flat config.
- `.next`, `out`, `build`, `next-env.d.ts` ignore edilir.

## 38. shadcn ve UI Konfigurasyonu

`components.json`:

- Style: `radix-nova`
- RSC: true
- TSX: true
- Tailwind CSS dosyasi: `src/app/globals.css`
- Base color: neutral
- CSS variables: true
- Icon library: lucide
- Alias'lar:
  - `components`: `@/components`
  - `utils`: `@/lib/utils`
  - `ui`: `@/components/ui`
  - `lib`: `@/lib`
  - `hooks`: `@/hooks`

## 39. Yardimci Utility

### `lib/utils.ts`

`cn(...inputs)`:

- `clsx` ile class listesi olusturur.
- `tailwind-merge` ile Tailwind class cakismalarini cozer.
- Projede className birlestirme icin kullanilir.

## 40. Statik Dosyalar

`public` altinda Next default SVG asset'leri bulunur:

- `vercel.svg`
- `window.svg`
- `file.svg`
- `globe.svg`
- `next.svg`

Mevcut incelenen kodda bu asset'lerin aktif kullanimina rastlanmamistir.

## 41. Mevcut Dosya Bazli Ozet

### `src/app`

- `layout.tsx`: Root layout, metadata, tema cookie okuma, AppShell.
- `globals.css`: Tailwind/shadcn tema token'lari.
- `page.tsx`: `HomePage`.
- `not-found.tsx`: 404 UI.
- `error.tsx`: Error boundary UI.
- `(auth)/*`: Auth, MFA, profil sayfalari.
- `(analysis)/*`: AI analiz sureci sayfalari.
- `api/*`: Next route handler proxy katmani.

### `src/features/auth`

- `login`: Login formu, schema, action, tipler.
- `register`: Register formu, schema, action, tipler.
- `forgot-password`: Email ile sifre reset linki isteme.
- `reset-password`: Token ile yeni sifre belirleme.
- `email-validate`: Email dogrulama bekleme ve link tekrar gonderme.
- `mfa`: MFA kurulum, login, QR, recovery code akislari.
- `logout`: Tek oturum cikisi.
- `logout-all`: Tum oturumlari kapatma.
- `profile`: Profil guvenlik UI bilesenleri.
- `refresh`: Token refresh action ve servis.

### `src/features/analysis`

- `ai-upload`: Dosya yukleme ve extract action/tipleri.
- `ai-analysis`: Analiz baslatma action'i, schema, sonuc tipleri ve dashboard bilesenleri.
- `chatbot`: Analiz ID uzerinden soru-cevap action ve UI.

### `src/features/home`

- Landing/authenticated home icerik bilesenleri.
- Capability, workflow ve insight statik data'lari.

### `src/features/user`

- Profil bilgisi server action'i.
- User profile tipi.

### `src/shared`

- `lib/api`: `serverApi`, `routeApi`, ortak API tipleri.
- `lib/auth`: Cookie ve dogrulama yardimcilari.
- `lib/validation`: FormData + Zod helper'lari.
- `hooks/profile.ts`: Client profil hook'u.
- `components/layout`: App shell ve logout button.
- `components/form`: SubmitButton.
- `components/ui`: Theme toggle ve theme action.
- `types`: Theme tipleri.

## 42. Projenin Mantiksal Mimarisi

Proje su katmanlara ayrilabilir:

1. UI katmani:
   - `src/app` sayfalari.
   - `src/features/**/components`.

2. Server action katmani:
   - Form submit, token okuma, validasyon, route API cagirilari.
   - `src/features/**/actions.ts`.

3. Next API/BFF katmani:
   - `src/app/api/**/route.ts`.
   - Backend endpoint'leriyle konusur.

4. Backend API katmani:
   - Frontend projesi disindadir.
   - `API_BASE_URL` ile erisilir.

5. Shared infrastructure:
   - Cookie yonetimi.
   - API response parsing.
   - Form validation.
   - Theme.
   - Profile hook.

6. Test katmani:
   - Unit.
   - Integration.
   - E2E.
   - MSW backend/local route mock'lari.

## 43. Uygulama Icinde Kullanilan Baslica State Mekanizmalari

- Server-side cookies:
  - Auth token.
  - Refresh token.
  - MFA challenge.
  - Pending email verification.
  - Recovery codes.
  - Theme.

- React client state:
  - Form input states.
  - Password visibility.
  - Chatbot open/closed state.
  - Chat messages.
  - Manual transaction rows.
  - Taksit paneli acik/kapali state'i.
  - Upload file name.
  - Analysis dashboard loaded data.

- SessionStorage:
  - Upload sonucu.
  - Extract sonucu.
  - Analysis sonucu.

- Server actions:
  - Form submit ve backend flow state dondurme.

## 44. Kullanici Deneyimi Akislari

### Anonymous kullanici

- Ana sayfada urun tanitimi gorur.
- Login ve register linkleri gorur.
- Protected rotalara giderse login sayfasina redirect edilir.

### Authenticated kullanici

- Ana sayfada dogrudan AI analiz merkezi odakli icerik gorur.
- Header'da AI Analizi, Profil ve Cikis linklerini gorur.
- Auth-only rotalara gitmeye calisirsa ana sayfaya redirect edilir.

### Email dogrulamamis kullanici

- Login veya register sonrasi pending verification cookie yazilir.
- `/email-dogrula` ekranina yonlendirilir.
- Dogrulama maili tekrar gonderilebilir.

### MFA gerektiren kullanici

- Login sonrasi MFA challenge cookie yazilir.
- `/mfa/giris-yap` ekraninda 6 haneli kod girer.
- Basariliysa token cookie'leri yazilir.

## 45. Test Edilen Kritik Davranislar

Mevcut testler asagidaki kritik davranislari kapsar:

- Login/register UI elemanlari render ediliyor.
- Password visibility toggle calisiyor.
- Form validation hatalari dogru donuyor.
- Upload butonu profil yokken disabled.
- Dosya secimi UI'da gorunuyor.
- MFA formlari calisiyor.
- Analysis dashboard sessionStorage verisiyle render oluyor.
- Analysis data yoksa kullanici satir girise yonlendiriliyor.
- routeApi basarili ve hatali cevaplari dogru parse ediyor.
- Next route handler backend MSW mock'larina dogru yonleniyor.
- Proxy anonymous protected route redirect yapiyor.
- Proxy authenticated kullaniciyi auth-only route'tan uzaklastiriyor.
- Proxy refresh token ile yeni cookie yazabiliyor.
- Home sayfasi e2e navigasyonlari calisiyor.
- Temel accessibility taramasi kritik violation bulmuyor.

## 46. Gelistirme Yaparken Dikkat Edilecek Noktalar

Bu proje Next.js 16.2.7 kullandigi icin, yeni kod yazmadan once ilgili yerel Next dokumanlari `node_modules/next/dist/docs/` altindan okunmalidir. `AGENTS.md` dosyasi bunu ozellikle belirtir.

Projeye yeni ozellik eklerken:

- Var olan feature klasoru yapisi takip edilmeli.
- Formlar icin Zod schema + `validateFormData` pattern'i kullanilmali.
- Backend ile konusma gerekiyorsa once Next route handler, sonra `serverApi` pattern'i tercih edilmeli.
- Auth gerektiren backend isteklerinde access token Authorization header olarak, refresh token ise `Refresh-Token` header akisi ile tasinmali.
- SessionStorage kullanimi analiz adimlari arasinda mevcut pattern'e uygun surdurulmeli.
- UI icin mevcut Tailwind/shadcn tema token'lari kullanilmali.
- Kritik akislara unit/integration/e2e test eklenmeli.

## 47. Kisa Sonuc

`finance-analysis-frontend`, Next.js App Router uzerine kurulmus, backend API'leriyle BFF route handler katmani araciligiyla konusan, auth/MFA guvenlik akislari ve AI destekli finans analiz ekranlari bulunan kapsamli bir frontend uygulamasidir. Projenin merkezi akisi kullanicidan finans verisi almak, bu veriyi backend AI servislerine gondermek, analiz sonucunu okunabilir/gorsel panellerle sunmak ve ayni analiz uzerinden chatbot ile etkilesim saglamaktir.
