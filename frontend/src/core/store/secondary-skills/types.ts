import { AppError } from 'src/core/models/app-error';

import { Skill } from '../../models/skill';
import { SecondarySkill } from '../../models/secondary-skill';

/** Skills state. */
export type SecondarySkillsState = Readonly<{

  /** Is loading. */
  readonly isLoading: boolean;

  /** Secondary skills. */
  readonly secondarySkills: SecondarySkill[] | null;

  /** Error. */
  readonly error: AppError<SecondarySkill[]> | null;
}>;

/** Skills actions. */
export interface SecondarySkillsActions {

  /** Get secondary skills. */
  getSecondarySkills(): Promise<void>;

  /** Reset store. */
  reset(): void;
}
