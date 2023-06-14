import { isApiError } from '../utils/axios-error-guard';

import { AppErrorMapper } from './mappers/appErrorMapper';
import { ActivateApi } from './api/activate-api';
import { http } from './http';
import { CONFIG } from './config';
import { FilesApi } from './api/files-api';

export namespace FilesService {

  /**
   * Upload avatar file.
   * @param file
   */
  export async function postAvatarFile(file: File): Promise<string> {
    try {
      return await FilesApi.postAvatarFile(file);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }

  /**
   * Upload work file.
   * @param file
   */
  export async function postWorkFile(file: File): Promise<string> {
    try {
      return await FilesApi.postWorkFile(file);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }
}
