import { AxiosError } from 'axios';
import { UserSecret } from 'src/core/models/user-secret';
import { Login } from 'src/core/models/login-data';

import { LoginDto } from '../../dtos/login-dto';
import { ApiErrorDto } from '../../dtos/validation-error-dto';

import { UserSecretDto } from '../../dtos/user-secret-dto';
import { userSecretMapper } from '../mappers/userSecretMapper';
import { http } from '../http';
import { UserSecretStorageService } from '../user-secret-storage-service';

/** Auth API. */
export namespace AuthApi {

  const loginUrl = 'auth/login/';
  const refreshSecretUrl = 'auth/token/refresh/';

  /**
   * Logs a user in with email and password.
   * @param loginData Login data.
   */
  export async function login({ email, password }: Login): Promise<UserSecret> {
    const userSecretDto = await mockLogin(email, password);
    const userSecret = userSecretMapper.fromDto(userSecretDto);

    return userSecret;
  }

  /** Logs the current user out. */
  export async function logout(): Promise<void> {
    await UserSecretStorageService.remove();
  }

  /**
   * Refresh secret.
   * @param secret User secret.
   */
  export async function refreshSecret(secret: UserSecret): Promise<UserSecretDto> {
    const { data: newSecretDto } = await http.post<UserSecretDto>(
      refreshSecretUrl,
      userSecretMapper.toDto(secret),
    );

    return userSecretMapper.fromDto(newSecretDto);
  }

  // TODO (template preparation): This function was made for template. Remove it from your project.
  /**
   * Mocks user login.
   * @param email Email.
   * @param password Password.
   */
  async function mockLogin(email: string, password: string): Promise<UserSecret> {
    try {
      return await http.post(loginUrl, {
        email, password,
      });
    } catch (error: unknown) {
      const axiosMockError = error as AxiosError<ApiErrorDto<LoginDto>>;
      if (!email) {
        axiosMockError.message = 'No login provided';
        throw axiosMockError;
      }

      if (!password || password.length < 5) {
        axiosMockError.message = 'Incorrect password';

        axiosMockError.response = {
          config: {},
          data: {
            data: {
              password: ['Minimum password length 5 characters'],
            },
            detail: 'Incorrect password',
          },
          headers: {},
          status: 400,
          statusText: 'Validation error.',
        };

        throw axiosMockError;
      }

      return {
        token: 'fake-token',
      };
    }
  }
}
