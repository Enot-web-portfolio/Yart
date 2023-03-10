import { create } from 'zustand';

import { CurrentUserService } from 'src/core/services/user-service';

import { User } from 'src/core/models/user';

import { AppError } from '../../models/app-error';

import { CurrentUserActions, CurrentUserState } from './types';
import { initialState } from './state';

export const useCurrentUserStore = create<CurrentUserState & CurrentUserActions>(set => ({
  ...initialState,
  async getCurrentUser() {
    try {
      set(() => ({ isLoading: true, user: null, error: null }));
      const user = await CurrentUserService.getCurrentUser();
      set(() => ({ user, error: null, isLoading: false }));
    } catch (error: unknown) {
      if (error instanceof AppError<User>) {
        set(() => ({ error: error as AppError, isLoading: false, user: null }));
      } else {
        throw (error);
      }
    }
  },
  reset() {
    set(() => ({ ...initialState }));
  },
}));
