import { refreshAction } from "@/src/features/auth/refresh/actions";
import type { ApiResult, HttpMethod, QueryParams } from "./types";

type ServerApiOptions<TBody = unknown> = {
  method?: HttpMethod;
  endpoint: string;
  body?: TBody;
  query?: QueryParams;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  token?: string;
  authRetry?: boolean;
  refreshToken?: string | null;
};

const API_BASE_URL = process.env.API_BASE_URL;

function buildUrl(endpoint: string, query?: QueryParams): string {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL environment variable is missing.");
  }

  const base = API_BASE_URL.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const url = new URL(`${base}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

async function parseResponse<T>(response: Response): Promise<ApiResult<T>> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      error:
        payload?.message ||
        payload?.error ||
        response.statusText ||
        "Request failed.",
      details: payload,
    };
  }

  return {
    success: true,
    status: response.status,
    data: payload as T,
  };
}

export async function serverApi<TResponse, TBody = unknown>({
  method = "GET",
  endpoint,
  body,
  query,
  headers,
  cache = "no-store",
  next,
  token,
  authRetry = false,
  refreshToken = null,
}: ServerApiOptions<TBody>): Promise<ApiResult<TResponse>> {
  try {
    const response = await fetch(buildUrl(endpoint, query), {
      method,
      cache,
      next,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body:
        method !== "GET" && body !== undefined
          ? JSON.stringify(body)
          : undefined,
    });

    if (response.status !== 401 || !authRetry) {
      return parseResponse<TResponse>(response);
    }

    const refreshResult = await refreshAction(refreshToken);

    if (!refreshResult.success) {
      return parseResponse<TResponse>(response);
    }

    const retryResponse = await fetch(buildUrl(endpoint, query), {
      method,
      cache,
      next,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshResult.tokens.accessToken}`,
        ...headers,
      },
      body:
        method !== "GET" && body !== undefined
          ? JSON.stringify(body)
          : undefined,
    });

    return parseResponse<TResponse>(retryResponse);

  } catch (error) {
    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : "Unknown server error.",
    };
  }
}