import { User } from '../models/user';
import { isApiError } from '../utils/axios-error-guard';

import { ShortUser } from '../models/short-user';

import { UsersApi } from './api/users-api';
import { AppErrorMapper } from './mappers/appErrorMapper';

export namespace UsersService {

  /** Get current user. */
  export async function getCurrentUser(): Promise<User> {
    try {
      return await UsersApi.getCurrentUser();
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Get users.
   * @param page - Номер страницы.
   * @param count - Кол-во элементов на странице.
   * @param onlySubscriptions - Только подписчики.
   * @param search - Значение в поиске.
   * @param mainSkills - Выбранные категории.
   */
  export async function getUsers(page?: number, count?: number, onlySubscriptions?: boolean, search?: string, mainSkills?: string[] | number[]): Promise<ShortUser[]> {
    try {
      return await UsersApi.getUsers(page, count, onlySubscriptions, search, mainSkills);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }
}
