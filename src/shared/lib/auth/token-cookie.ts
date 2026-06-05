import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

type SetAuthCookiesParams = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAtUtc: string;
  refreshTokenExpiresAtUtc: string;
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

  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}