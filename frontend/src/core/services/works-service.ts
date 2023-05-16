import { isApiError } from '../utils/axios-error-guard';

import { Work } from '../models/work';

import { AppErrorMapper } from './mappers/appErrorMapper';
import { WorksApi } from './api/works-api';

export namespace WorksService {

  /**
   * Get workd.
   * @param page - Текущая страница работ.
   * @param count - Кол-во работ на странице.
   * @param onlySubscriptions - Работы только людей, на которых подписан.
   * @param userId - Работы пользователя с данным id.
   * @param mainSkills - Выбранные категории
   */
  export async function getWorks(page: number, count: number, onlySubscriptions: boolean, userId?: number, mainSkills?: number[]): Promise<Work[]> {
    try {
      return await WorksApi.getWorks(page, count, onlySubscriptions, userId, mainSkills);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Like work.
   * @param workId - Id работы.
   * @param userId - Id пользователя, который лайкает.
   */
  export async function postWorkLike(workId: number, userId: number) {
    try {
      await WorksApi.postWorkLike(workId, userId);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Like work.
   * @param workId - Id работы.
   * @param userId - Id пользователя, который убирает лайк.
   */
  export async function postWorkUnlike(workId: number, userId: number) {
    try {
      await WorksApi.postWorkUnlike(workId, userId);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }
}
