import { Skill } from '../models/skill';
import { isApiError } from '../utils/axios-error-guard';

import { SecondarySkill } from '../models/secondary-skill';

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
    }
  }

  /** Get secondary skills. */
  export async function getSecondarySkills(): Promise<SecondarySkill[]> {
    try {
      return await SkillsApi.getSecondarySkills();
    } catch (error: unknown) {
      if (isApiError(error)) {
        throw AppErrorMapper.fromDto(error);
      }
      throw error;
    }
  }
}
