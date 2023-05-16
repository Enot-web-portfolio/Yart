import { AppError } from 'src/core/models/app-error';
import {Skill} from "../../models/skill";

/** Skills state. */
export type SkillsState = Readonly<{

  /** Is loading. */
  readonly isLoading: boolean;

  /** Skills. */
  readonly defaultSkills: Skill[] | null;

  /** Error. */
  readonly error: AppError<Skill[]> | null;
}>

/** Skills actions. */
export interface SkillsActions {

  /** Get skills. */
  getSkills(): Promise<void>;

  /** Reset store. */
  reset(): void;
}
