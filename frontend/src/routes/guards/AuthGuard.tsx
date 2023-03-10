import { FC } from 'react';
import {
  Navigate, Outlet, To, useLocation,
} from 'react-router-dom';
import { useCurrentUserStore } from 'src/core/store/user/store';

export const AuthGuard: FC = () => {
  const location = useLocation();
  const user = useCurrentUserStore(store => store.user);

  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
