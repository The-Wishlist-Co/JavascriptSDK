import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getCachedToken, invalidateToken, resolveToken } from "../auth/proxyAuth";

export const axiosInstance = axios.create({
  baseURL: 'https://api.au-aws.thewishlist.io/services'
});

type RetriableConfig = InternalAxiosRequestConfig & { _twcRetried?: boolean };

function authorizationOf(config: RetriableConfig): string | undefined {
  const header = config.headers?.Authorization ?? (config.headers as any)?.authorization;
  return typeof header === "string" ? header : undefined;
}

/**
 * Handles token expiry by re-requesting: on a 401 from a proxy-issued token, the
 * cached token is invalidated and the failed request is retried exactly once.
 *
 * Tokens supplied directly by the integrator are left alone — the SDK cannot
 * refresh them, so retrying would only repeat the 401.
 */
axiosInstance.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config as RetriableConfig | undefined;

  if (error.response?.status !== 401 || !config || config._twcRetried) {
    return Promise.reject(error);
  }

  const cachedToken = getCachedToken();
  if (!cachedToken || authorizationOf(config) !== `Bearer ${cachedToken}`) {
    return Promise.reject(error);
  }

  config._twcRetried = true;
  invalidateToken();

  let freshToken: string;
  try {
    freshToken = await resolveToken();
  } catch {
    // Re-auth failed; surface the original 401 to the caller.
    return Promise.reject(error);
  }

  config.headers.Authorization = `Bearer ${freshToken}`;
  return axiosInstance.request(config);
});
