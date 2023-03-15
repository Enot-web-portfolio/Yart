import { AppError } from 'src/core/models/app-error';
import { Login } from 'src/core/models/login-data';

/** Auth state. */
export interface AuthState {

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

  /** Logout. */
  logout(): Promise<void>;

  /** Reset. */
  reset(): void;
}
