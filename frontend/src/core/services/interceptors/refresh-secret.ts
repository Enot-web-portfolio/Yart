import { AxiosError, AxiosRequestConfig } from 'axios';

import { http } from '../http';
import { CONFIG } from '../config';
import { UserSecretStorageService } from '../user-secret-storage-service';
import { AuthApi } from '../api/auth-api';

/**
 * Refresh secret interceptor.
 * @param error Server error.
 */
export async function refreshSecret(error: AxiosError) {
  const secret = await UserSecretStorageService.get();

  if (
    secret == null ||
    error.config == null ||
    !shouldRefreshSecretForUrl(error.config) ||
    (error.response != null && error.response.status !== 401)
  ) {
    throw error;
  }

  try {
    const newSecret = await AuthApi.refreshSecret(secret);
    await UserSecretStorageService.save(newSecret);
    return http.request(error.config);
  } catch (err: unknown) {
    await UserSecretStorageService.remove();
    throw err;
  }
}

/**
 * Checks if a request should be intercepted.
 * @param config Request config.
 */
export function shouldRefreshSecretForUrl(config: AxiosRequestConfig): boolean {
  const { url, baseURL } = config;

  if (url == null || baseURL == null) {
    return false;
  }

  const fullUrl = `${baseURL}${url}`;
  const homeUrl = new URL('', CONFIG.apiUrl).toString();

  const isHomeRequest = fullUrl.startsWith(homeUrl);
  const isAuthRequest = fullUrl.startsWith(new URL('auth', homeUrl).toString());

  return isHomeRequest && !isAuthRequest;
}
