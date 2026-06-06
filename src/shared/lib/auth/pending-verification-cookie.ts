import { cookies } from "next/headers";

const COOKIE_NAME = "pending_email_verification";

export type PendingVerificationPayload = {
  userId: string;
  email: string;
};

export async function setPendingVerificationCookie(payload: PendingVerificationPayload) {
  const cookieStore = await cookies();

  const value = Buffer.from(JSON.stringify(payload)).toString("base64url");

  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 30, // 30 dakika
  });
}

export async function getPendingVerificationCookie(): Promise<PendingVerificationPayload | null> {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(COOKIE_NAME);

  if (!cookie?.value) {
    return null;
  }

  try {
    const json = Buffer.from(cookie.value, "base64url").toString("utf-8");
    return JSON.parse(json) as PendingVerificationPayload;
  } catch {
    return null;
  }
}

export async function clearPendingVerificationCookie() {
  const cookieStore = await cookies();

  cookieStore.delete({ name: COOKIE_NAME, path: "/" });
}