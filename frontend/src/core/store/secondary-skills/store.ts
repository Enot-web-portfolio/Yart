import { create } from 'zustand';

import { SkillsService } from '../../services/skills-service';

import { SecondarySkill } from '../../models/secondary-skill';

import { AppError } from '../../models/app-error';

import { SecondarySkillsState, SecondarySkillsActions } from './types';
import { initialState } from './state';

export const useSecondarySkillsStore = create<SecondarySkillsState & SecondarySkillsActions>(set => ({
  ...initialState,
  async getSecondarySkills() {
    try {
      set(() => ({ isLoading: true, secondarySkills: null, error: null }));
      const secondarySkills = await SkillsService.getSecondarySkills();
      set(() => ({ secondarySkills, error: null, isLoading: false }));
    } catch (error: unknown) {
      if (error instanceof AppError<SecondarySkill[]>) {
        set(() => ({ error: error as AppError, isLoading: false, secondarySkills: null }));
      } else {
        throw (error);
      }
    }
  },
  reset() {
    set(() => ({ ...initialState }));
  },
}));
