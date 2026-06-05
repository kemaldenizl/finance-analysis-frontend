import type { ApiResult, HttpMethod, QueryParams } from "./types";

type RouteApiOptions<TBody = unknown> = {
  method?: HttpMethod;
  endpoint: string;
  body?: TBody;
  query?: QueryParams;
  headers?: HeadersInit;
  cache?: RequestCache;
};

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

function buildRouteUrl(endpoint: string, query?: QueryParams): string {
  const baseUrl = getBaseUrl();
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${baseUrl}${path}`, "http://localhost:3000");

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  /**
   * Browser tarafında relative URL dönüyoruz.
   * Server tarafında absolute URL gerekiyor.
   */
  if (typeof window !== "undefined") {
    return `${url.pathname}${url.search}`;
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
        payload?.error ||
        payload?.message ||
        response.statusText ||
        "Request failed.",
      details: payload,
    };
  }

  return {
    success: true,
    status: response.status,
    data: payload?.data ?? payload,
  };
}

export async function routeApi<TResponse, TBody = unknown>({
  method = "GET",
  endpoint,
  body,
  query,
  headers,
  cache = "no-store",
}: RouteApiOptions<TBody>): Promise<ApiResult<TResponse>> {
  try {
    const response = await fetch(buildRouteUrl(endpoint, query), {
      method,
      cache,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body:
        method !== "GET" && body !== undefined
          ? JSON.stringify(body)
          : undefined,
    });

    return parseResponse<TResponse>(response);
  } catch (error) {
    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : "Unknown request error.",
    };
  }
}