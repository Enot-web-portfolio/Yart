import { useEffect } from 'react';
import { Login } from 'src/core/models/login-data';
import { useAuthStore } from 'src/core/store/auth/store';
import { useCurrentUserStore } from 'src/core/store/user/store';

import { SignUp } from '../../models/signup-data';

export const useAuthState = () => {
  const resetUserStore = useCurrentUserStore(store => store.reset);
  const getCurrentUser = useCurrentUserStore(store => store.getCurrentUser);
  const isUserAuthorized = useAuthStore(store => store.isUserAuthorized);
  const logout = useAuthStore(store => store.logout);
  const login = useAuthStore(store => store.login);
  const signUp = useAuthStore(store => store.signUp);
  const error = useAuthStore(store => store.error);
  const isOpenAuth = useAuthStore(store => store.isOpenAuth);
  const openAuthModal = useAuthStore(store => store.openAuthModal);
  const closeAuthModal = useAuthStore(store => store.closeAuthModal);

  useEffect(() => {
    if (isUserAuthorized) {
      getCurrentUser();
    }
  }, [isUserAuthorized]);

  return {
    async logout() {
      await logout();
      resetUserStore();
    },
    async login(loginData: Login) {
      await login(loginData);
    },
    async signUp(signUpData: SignUp) {
      await signUp(signUpData);
    },
    error,
    isUserAuthorized,
    isOpenAuth,
    openAuthModal,
    closeAuthModal,
  };
};
