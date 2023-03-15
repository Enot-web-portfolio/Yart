import { Login } from 'src/core/models/login-data';
import { create } from 'zustand';

import { AppError } from '../../models/app-error';
import { AuthService } from '../../services/auth-service';

import { AuthState, AuthActions } from './types';
import { initialState } from './state';

export const useAuthStore = create<AuthState & AuthActions>(set => ({
  ...initialState,
  async login(loginData) {
    try {
      set(() => ({ isLoading: true }));
      await AuthService.login(loginData);
      set(() => ({
        isUserAuthorized: true,
        error: null,
        isLoading: false,
      }));
    } catch (e: unknown) {
      if (!(e instanceof AppError<Login>)) {
        throw e;
      }
      set(() => ({
        isLoading: false,
        isUserAuthorized: false,
        error: e as AppError<Login>,
      }));
    }
  },
  async logout() {
    await AuthService.logout();
    set(() => ({ isUserAuthorized: false, error: null }));
  },
  reset() {
    set(() => ({ ...initialState }));
  },
}));
