import { CanceledError } from 'axios';

import { User } from '../models/user';
import { isApiError } from '../utils/axios-error-guard';

import { ShortUser } from '../models/short-user';

import { EditorUser } from '../models/editor-user';

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
   * Get current user.
   * @param id - User id.
   */
  export async function getUser(id: string | number): Promise<User> {
    try {
      return await UsersApi.getUser(id);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Get editor user.
   * @param id - User id.
   */
  export async function getUserEdit(id: string | number): Promise<EditorUser> {
    try {
      return await UsersApi.getUserEdit(id);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Activation email resend.
   * @param email - Почта для подтверждения.
   */
  export async function postActivationResend(email: string) {
    try {
      await UsersApi.postActivationResend(email);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Post user edit.
   * @param id - User id.
   * @param user
   */
  export async function postUserEdit(id: string | number, user: EditorUser) {
    try {
      await UsersApi.postUserEdit(id, user);
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
  export async function getUsers(page: number, count: number, onlySubscriptions: boolean, search?: string, mainSkills?: string[] | number[]): Promise<ShortUser[]> {
    try {
      return await UsersApi.getUsers(page, count, onlySubscriptions, search, mainSkills);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Subscribe on user.
   * @param userId - Id пользователя, на которого подписываются.
   */
  export async function postSubscribeUser(userId: number | string): Promise<boolean> {
    try {
      await UsersApi.postSubscribe(userId);
      return true;
    } catch (error: unknown) {
      return false;
    }
  }

  /**
   * Unsubscribe on user.
   * @param userId - Id пользователя, от которого отписываются.
   */
  export async function postUnsubscribeUser(userId: number | string): Promise<boolean> {
    try {
      await UsersApi.postUnsubscribe(userId);
      return true;
    } catch (error: unknown) {
      return false;
    }
  }
}
