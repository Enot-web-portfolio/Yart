import { create } from 'zustand';

import {SkillsService} from "../../services/skills-service";

import { Skill} from "../../models/skill";

import { AppError } from '../../models/app-error';

import { SkillsState, SkillsActions } from './types';
import { initialState } from './state';

export const useSkillsStore = create<SkillsState & SkillsActions>(set => ({
  ...initialState,
  async getSkills() {
    try {
      set(() => ({ isLoading: true, defaultSkills: null, error: null }));
      const defaultSkills = await SkillsService.getSkills();
      set(() => ({ defaultSkills, error: null, isLoading: false }));
    } catch (error: unknown) {
      if (error instanceof AppError<Skill[]>) {
        set(() => ({ error: error as AppError, isLoading: false, defaultSkills: null }));
      } else {
        throw (error);
      }
    }
  },
  reset() {
    set(() => ({ ...initialState }));
  },
}));
