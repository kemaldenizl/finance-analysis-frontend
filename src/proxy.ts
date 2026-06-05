import { NextResponse, type NextRequest } from "next/server";
import { requestTokenRefresh } from "@/src/features/auth/refresh/refresh.service";
import type { RefreshResponse } from "@/src/features/auth/refresh/refresh.types";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/src/shared/lib/auth/token-cookie";

type AuthTokens = RefreshResponse["tokens"];

/** Sadece giriş yapmamış kullanıcıların görmesi gereken sayfalar. */
const AUTH_ONLY_ROUTES = [
  "/giris-yap",
  "/kayit-ol",
  "/sifremi-unuttum",
  "/sifremi-sifirla",
];

/** Yalnızca kimliği doğrulanmış kullanıcıların erişebileceği sayfalar. */
const PROTECTED_ROUTES = [
  "/ai-basla",
  "/ai-analysis",
  "/dosya-yukle",
  "/satir-giris",
  "/mfa/kurulum",
  "/mfa/kurulum-basla",
  "/mfa/kurulum-tamamla",
  "/mfa/kodlar",
];

const LOGIN_PATH = "/giris-yap";
const AUTHENTICATED_HOME = "/";

const cookieBaseOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function setAuthCookiesOnResponse(
  response: NextResponse,
  tokens: AuthTokens,
): void {
  response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...cookieBaseOptions,
    expires: new Date(tokens.accessTokenExpiresAtUtc),
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    ...cookieBaseOptions,
    expires: new Date(tokens.refreshTokenExpiresAtUtc),
  });
}

function clearAuthCookiesOnResponse(response: NextResponse): void {
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);
}

/**
 * Render'dan önce çalışır ve iki işi yapar:
 * 1) Access token yoksa ama refresh token varsa tokenları sessizce yeniler;
 *    yeni değerleri hem request'e (aynı render geçişi) hem response'a (tarayıcı)
 *    yazar.
 * 2) Route koruması: korumalı sayfalara kimlik doğrulanmadan girişi engeller,
 *    kimliği doğrulanmış kullanıcıyı login/register gibi sayfalardan uzaklaştırır.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  let refreshedTokens: AuthTokens | null = null;
  let refreshFailed = false;

  if (!accessToken && refreshToken) {
    const refreshed = await requestTokenRefresh(refreshToken);

    if (refreshed) {
      refreshedTokens = refreshed.tokens;
      accessToken = refreshed.tokens.accessToken;
      request.cookies.set(ACCESS_TOKEN_COOKIE, refreshed.tokens.accessToken);
      request.cookies.set(REFRESH_TOKEN_COOKIE, refreshed.tokens.refreshToken);
    } else {
      refreshFailed = true;
    }
  }

  const isAuthenticated = Boolean(accessToken);

  let response: NextResponse;

  if (isAuthenticated && matchesRoute(pathname, AUTH_ONLY_ROUTES)) {
    response = NextResponse.redirect(new URL(AUTHENTICATED_HOME, request.url));
  } else if (!isAuthenticated && matchesRoute(pathname, PROTECTED_ROUTES)) {
    response = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  } else {
    response = NextResponse.next({ request: { headers: request.headers } });
  }

  if (refreshedTokens) {
    setAuthCookiesOnResponse(response, refreshedTokens);
  } else if (refreshFailed) {
    clearAuthCookiesOnResponse(response);
  }

  return response;
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
