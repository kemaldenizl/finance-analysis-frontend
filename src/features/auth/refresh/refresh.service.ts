import type { RefreshResponse } from "./refresh.types";

function getApiBaseUrl(): string {
  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    throw new Error("API_BASE_URL environment variable is missing.");
  }

  return baseUrl.replace(/\/$/, "");
}

/**
 * Backend'e refresh isteğini atan tek nokta (DRY).
 * Cookie/Response yazımı bilinçli olarak burada YOK; çağıran katman
 * (Server Action ya da Route Handler) yazılabilir context'e sahip olduğu
 * için persist işini orası üstlenir.
 */
export async function requestTokenRefresh(
  refreshToken: string,
): Promise<RefreshResponse | null> {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/refresh`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as RefreshResponse;
}
