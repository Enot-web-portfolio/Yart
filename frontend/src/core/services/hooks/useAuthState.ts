import { useEffect } from 'react';
import { Login } from 'src/core/models/login-data';
import { useAuthStore } from 'src/core/store/auth/store';
import { useCurrentUserStore } from 'src/core/store/user/store';

import { SignUp } from '../../models/signup-data';
import { UserSecretStorageService } from '../user-secret-storage-service';

export const useAuthState = () => {
  const resetUserStore = useCurrentUserStore(store => store.reset);
  const getCurrentUser = useCurrentUserStore(store => store.getCurrentUser);
  const user = useCurrentUserStore(store => store.user);
  const isUserAuthorized = useAuthStore(store => store.isUserAuthorized);
  const setIsUserAuthorized = useAuthStore(store => store.setIsUserAuthorized);
  const logout = useAuthStore(store => store.logout);
  const login = useAuthStore(store => store.login);
  const signUp = useAuthStore(store => store.signUp);
  const error = useAuthStore(store => store.error);
  const isOpenAuth = useAuthStore(store => store.isOpenAuth);
  const openAuthModal = useAuthStore(store => store.openAuthModal);
  const closeAuthModal = useAuthStore(store => store.closeAuthModal);

  useEffect(() => {
    if (user !== null && !isUserAuthorized) {
      setIsUserAuthorized(true);
    }
  }, [user]);

  useEffect(() => {
    if (user === null && isUserAuthorized) {
      getCurrentUser();
    }
  }, [isUserAuthorized]);

  /** Authorize user by secret token. */
  async function authBySecret() {
    const secret = await UserSecretStorageService.get();
    if (secret !== null && user === null) {
      getCurrentUser();
    }
  }

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
    authBySecret,
  };
};
