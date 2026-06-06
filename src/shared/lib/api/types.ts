export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiSuccess<T> = {
  success: true;
  data: T;
  status: number;
};

export type ApiError = {
  success: false;
  error: string;
  status: number;
  details?: unknown;
};

export type ApiResult<T> = ApiSuccess<T> | ApiError;

export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;