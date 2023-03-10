import { FC } from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useCurrentUserStore } from 'src/core/store/user/store';

export const NonAuthGuard: FC = () => {
  const [search] = useSearchParams();
  const user = useCurrentUserStore(store => store.user);

  if (user != null) {
    const redirect = search.get('next') ?? '';
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
