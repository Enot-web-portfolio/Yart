import { AxiosError } from 'axios';

import { toast } from 'react-toastify';

import { Login, LoginErrors } from '../models/login-data';
import { isApiError } from '../utils/axios-error-guard';

import { SignUp, SignUpErrors } from '../models/signup-data';

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
      const { response } = error as AxiosError<LoginErrors>;
      if (response) {
        const { data } = response;
        toast.error(data.detail);
      }
      if (isApiError(error)) {
        throw AppErrorMapper.fromDtoWithValidationSupport(error, loginMapper);
      }
      throw error;
    }
  }

  /**
   * Login.
   * @param signUpData Login data.
   */
  export async function signUp(signUpData: SignUp): Promise<void> {
    try {
      const userSecret = await AuthApi.signUp(signUpData);
      UserSecretStorageService.save(userSecret);
    } catch (error: unknown) {
      const { response } = error as AxiosError<SignUpErrors>;
      if (response) {
        const { data: { password, detail, email } } = response;
        console.log(response);
        if (password) {
          toast.error(password.join('\n'));
        } else if (email) {
          toast.error(email.join(', '));
        } else if (detail) {
          toast.error(detail);
        }
      }
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
