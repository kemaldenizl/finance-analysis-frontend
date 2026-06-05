import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";
const MFA_CHALLENGE_COOKIE = "mfa_challenge";
type SetAuthCookiesParams = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAtUtc: string;
  refreshTokenExpiresAtUtc: string;
};

type SetMfaChallengeCookieParams = {
  challengeToken: string;
  expiresAtUtc: string;
};

export async function setAuthCookies({
  accessToken,
  refreshToken,
  accessTokenExpiresAtUtc,
  refreshTokenExpiresAtUtc,
}: SetAuthCookiesParams) {
  const cookieStore = await cookies();

  const accessTokenExpires = new Date(accessTokenExpiresAtUtc);
  const refreshTokenExpires = new Date(refreshTokenExpiresAtUtc);

  cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: accessTokenExpires,
  });

  cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: refreshTokenExpires,
  });
}

export async function setMfaChallengeCookie({
  challengeToken,
  expiresAtUtc,
}: SetMfaChallengeCookieParams) {
  const cookieStore = await cookies();
  cookieStore.set(MFA_CHALLENGE_COOKIE, challengeToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/mfa/giris-yap",
    expires: new Date(expiresAtUtc),
  });
}

export async function getMfaChallengeCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(MFA_CHALLENGE_COOKIE)?.value ?? null;
}

export async function getAccessToken() {
  const cookieStore = await cookies();

  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();

  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null;
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete({ name: ACCESS_TOKEN_COOKIE, path: "/" });
  cookieStore.delete({ name: REFRESH_TOKEN_COOKIE, path: "/" });
}

export async function clearMfaChallengeCookie() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: MFA_CHALLENGE_COOKIE, path: "/mfa/giris-yap" });
}