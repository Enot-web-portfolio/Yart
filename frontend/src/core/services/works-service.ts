import { isApiError } from '../utils/axios-error-guard';

import { Work } from '../models/work';

import { EditingWork } from '../models/editing-work';

import { AppErrorMapper } from './mappers/appErrorMapper';
import { WorksApi } from './api/works-api';

export namespace WorksService {

  /**
   * Get workd.
   * @param page - Текущая страница работ.
   * @param count - Кол-во работ на странице.
   * @param onlySubscriptions - Работы только людей, на которых подписан.
   * @param userId - Работы пользователя с данным id.
   * @param mainSkills - Выбранные категории.
   */
  export async function getWorks(page: number, count: number, onlySubscriptions: boolean, userId?: number | string, mainSkills?: number[] | string[]): Promise<Work[]> {
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
   * Get work.
   * @param workId - Id работы.
   */
  export async function getWork(workId: number): Promise<Work> {
    try {
      const work = await WorksApi.getWork(workId);
      return work;
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

  /** Get create work.*/
  export async function getWorkCreate(): Promise<EditingWork> {
    try {
      const data = await WorksApi.getWorkCreate();
      return data;
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Post create work.
   * @param work - Editing work data.
   */
  export async function postWorkCreate(work: EditingWork) {
    try {
      await WorksApi.postWorkCreate(work);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Get edit work.
   * @param id - Work id.
   */
  export async function getWorkEdit(id: number | string): Promise<EditingWork> {
    try {
      const data = await WorksApi.getWorkEdit(id);
      return data;
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Post create work.
   * @param work - Editing work data.
   * @param id - Work id.
   */
  export async function postWorkEdit(work: EditingWork, id: number | string) {
    try {
      await WorksApi.postWorkEdit(work, id);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }
}
