import { isApiError } from '../utils/axios-error-guard';

import { AppErrorMapper } from './mappers/appErrorMapper';
import { ActivateApi } from './api/activate-api';

export namespace ActivateService {

  /**
   * Activate mail.
   * @param uid - User id.
   * @param token - Token activate.
   */
  export async function postActivate(uid: string, token: string) {
    try {
      await ActivateApi.postActivate(uid, token);
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }
}
