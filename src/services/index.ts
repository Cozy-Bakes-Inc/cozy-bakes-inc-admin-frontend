import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { getToken } from "@/lib";
import { ApiResult, ErrorBody, ExtraConfig } from "@/types";
import { getPayloadMessage, getValidationErrors } from "@/lib/utils/helper";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const api = axios.create({
  baseURL: BASE_URL,
});

let unauthorizedHandler: (() => void | Promise<void>) | null = null;

export function registerUnauthorizedHandler(
  handler: (() => void | Promise<void>) | null,
) {
  unauthorizedHandler = handler;
}

function shouldHandleUnauthorizedSession(
  error: AxiosError,
  hasAuthorizationHeader: boolean,
) {
  const status = error.response?.status;

  if (status === 401) return hasAuthorizationHeader;

  if (status !== 403) return false;

  const data = error.response?.data as
    | { message?: unknown; status?: unknown }
    | undefined;
  const message = typeof data?.message === "string" ? data.message : "";
  const payloadStatus = typeof data?.status === "string" ? data.status : "";

  return (
    payloadStatus.toLowerCase() === "error" &&
    /unauthorized|admin access only/i.test(message)
  );
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const hasAuthorizationHeader = Boolean(
      error.config?.headers?.Authorization ||
      error.config?.headers?.authorization,
    );

    if (
      shouldHandleUnauthorizedSession(error, hasAuthorizationHeader) &&
      unauthorizedHandler
    ) {
      await unauthorizedHandler();
    }

    return Promise.reject(error);
  },
);

const getAuthHeaders = async (
  headers?: AxiosRequestConfig["headers"],
  isForm?: boolean,
) => {
  const token = await getToken();
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  return {
    "Content-Type": isForm ? "multipart/form-data" : "application/json",
    ...authHeader,
    ...headers,
  };
};

const safe = async <T = unknown, E extends { message: string } = ErrorBody>(
  method: Method,
  url: string,
  data?: unknown,
  config: ExtraConfig = {},
): Promise<ApiResult<T, E>> => {
  const { isForm, headers, ...rest } = config;
  try {
    const res = await api.request<T>({
      method,
      url,
      data,
      ...rest,
      headers: await getAuthHeaders(headers, isForm),
    });
    const msg = (res.data as { message: string })?.message;
    return { ok: true, status: res.status, data: res.data, message: msg };
  } catch (err) {
    const e = err as AxiosError<E>;
    const payload = e.response?.data;
    const payloadMessage = getPayloadMessage(payload);
    const validationErrors = getValidationErrors(payload);
    const message =
      validationErrors.length > 0
        ? `${payloadMessage ?? e.message}: ${validationErrors.join(" ")}`
        : (payloadMessage ?? e.message);
    return {
      ok: false,
      status: e.response?.status ?? 500,
      error: payload,
      message,
    };
  }
};

// single entry point for all methods
export const safeApi = async <
  T = unknown,
  E extends { message: string } = ErrorBody,
>(
  method: Method,
  url: string,
  data?: unknown,
  config?: ExtraConfig,
) => await safe<T, E>(method, url, data, config);

export const baseAPI = async <T = unknown>(method: Method, url: string) => {
  const response = await api.request<T>({
    method,
    url,
    headers: await getAuthHeaders(),
  });

  return response.data;
};
