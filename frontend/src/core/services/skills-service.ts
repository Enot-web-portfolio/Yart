import { Skill } from '../models/skill';
import { isApiError } from '../utils/axios-error-guard';

import { SkillsApi } from './api/skills-api';

import { AppErrorMapper } from './mappers/appErrorMapper';

export namespace SkillsService {

  /** Get skills. */
  export async function getSkills(): Promise<Skill[]> {
    try {
      return await SkillsApi.getSkills();
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;

      /* return new Promise(resolve => {
        resolve(null)
      });*/
    }
  }
}
