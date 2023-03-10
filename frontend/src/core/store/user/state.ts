import { CurrentUserState } from './types';

export const initialState: CurrentUserState = {
  error: null,
  isLoading: false,
  user: null,
};
