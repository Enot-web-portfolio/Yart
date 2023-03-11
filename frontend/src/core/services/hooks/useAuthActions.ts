import { useEffect } from 'react';
import { Login } from 'src/core/models/login-data';
import { useAuthStore } from 'src/core/store/auth/store';
import { useCurrentUserStore } from 'src/core/store/user/store';

export const useAuthActions = () => {
  const resetUserStore = useCurrentUserStore(store => store.reset);
  const getCurrentUser = useCurrentUserStore(store => store.getCurrentUser);
  const isUserAuthorized = useAuthStore(store => store.isUserAuthorized);
  const logout = useAuthStore(store => store.logout);
  const login = useAuthStore(store => store.login);

  useEffect(() => {
    if (isUserAuthorized) {
      getCurrentUser();
    }
  },[isUserAuthorized]);

  return {
    async logout() {
      await logout();
      resetUserStore();
    },
    async login(loginData: Login) {
      await login(loginData);
    },
  };
};
