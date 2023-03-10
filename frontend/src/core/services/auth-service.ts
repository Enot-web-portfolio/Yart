import { Login } from '../models/login-data';
import { isApiError } from '../utils/axios-error-guard';

import { AuthApi } from './api/auth-api';
import { AppErrorMapper } from './mappers/appErrorMapper';
import { loginMapper } from './mappers/loginMapper';
import { UserSecretStorageService } from './user-secret-storage-service';

export namespace AuthService {

  /**
   * Login.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<void> {
    try {
      const userSecret = await AuthApi.login(loginData);
      UserSecretStorageService.save(userSecret);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDtoWithValidationSupport(error, loginMapper);
      }
      throw error;
    }
  }

  /** Logout. */
  export async function logout(): Promise<void> {
    await UserSecretStorageService.remove();
  }
}
