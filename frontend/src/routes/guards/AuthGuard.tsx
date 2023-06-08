import { FC, useEffect } from 'react';
import {
  Navigate, Outlet, To, useLocation,
} from 'react-router-dom';
import { useCurrentUserStore } from 'src/core/store/user/store';

import { toUserSettings, toWorks } from '../route-links';

export const AuthGuard: FC = () => {
  const location = useLocation();
  const user = useCurrentUserStore(store => store.user);

  const redirect: To = {
    pathname: 'works',
  };

  if (!user) {
    return <Navigate to={toWorks()} replace />;
  }

  return <Outlet/>;
};
