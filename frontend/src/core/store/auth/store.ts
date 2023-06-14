import { Login } from 'src/core/models/login-data';
import { create } from 'zustand';

import { AppError } from '../../models/app-error';
import { AuthService } from '../../services/auth-service';

import { AuthState, AuthActions } from './types';
import { initialState } from './state';

export const useAuthStore = create<AuthState & AuthActions>(set => ({
  ...initialState,
  setIsUserAuthorized(isUserAuthorized: boolean) {
    set(() => ({ isUserAuthorized }));
  },
  async login(loginData) {
    try {
      set(() => ({ isLoading: true }));
      await AuthService.login(loginData);
      set(() => ({
        isUserAuthorized: true,
        error: null,
        isLoading: false,
        isOpenAuth: false,
      }));
    } catch (e: unknown) {
      set(() => ({
        isLoading: false,
        isUserAuthorized: false,
        error: e as AppError<Login>,
      }));
    }
  },
  async signUp(signUpData) {
    try {
      set(() => ({ isLoading: true }));
      await AuthService.signUp(signUpData);
      set(() => ({
        isUserAuthorized: true,
        error: null,
        isLoading: false,
      }));
    } catch (e: unknown) {
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
  openAuthModal() {
    set(() => ({ isOpenAuth: true }));
  },
  closeAuthModal() {
    set(() => ({ isOpenAuth: false }));
  },
}));
