import { AppError } from 'src/core/models/app-error';
import { User } from 'src/core/models/user';

/** Current user state. */
export interface CurrentUserState {

  /** Is loading. */
  readonly isLoading: boolean;

  /** User. */
  readonly user: User | null;

  /** Error. */
  readonly error: AppError<User> | null;
}

/** Current user actions. */
export interface CurrentUserActions {

  /** Get current user. */
  getCurrentUser(): Promise<void>;

  /** Reset store. */
  reset(): void;
}
