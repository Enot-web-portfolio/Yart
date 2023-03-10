import { AuthState } from './types';

export const initialState: AuthState = {
  isLoading: false,
  error: null,
  isUserAuthorized: false,
};
