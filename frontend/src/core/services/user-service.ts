import { User } from '../models/user';
import { isApiError } from '../utils/axios-error-guard';

import { UserApi } from './api/user-api';
import { AppErrorMapper } from './mappers/appErrorMapper';

export namespace CurrentUserService {

  /** Get current user. */
  export async function getCurrentUser(): Promise<User> {
    try {
      return await UserApi.getCurrentUser();
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }
}
