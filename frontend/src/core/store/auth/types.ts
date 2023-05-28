import { AppError } from 'src/core/models/app-error';
import { Login } from 'src/core/models/login-data';

import { SignUp } from '../../models/signup-data';

/** Auth state. */
export interface AuthState {

  /** Is open auth modal. */
  readonly isOpenAuth: boolean;

  /** Is loading. */
  readonly isLoading: boolean;

  /** Is user authorized. */
  isUserAuthorized: boolean;

  /** Error. */
  readonly error: AppError<Login> | null;
}

/** Auth actions. */
export interface AuthActions {

  /** Login. */
  login(data: Login): Promise<void>;

  /** SignUp. */
  signUp(data: SignUp): Promise<void>;

  /** Logout. */
  logout(): Promise<void>;

  /** Reset. */
  reset(): void;

  /** Open auth modal. */
  openAuthModal(): void;

  /** Close auth modal. */
  closeAuthModal(): void;
}
