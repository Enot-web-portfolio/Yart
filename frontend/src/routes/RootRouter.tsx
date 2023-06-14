import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { componentsRoutes } from '../features/components/routes';
import { worksRoutes } from '../features/works/routes';
import { usersRoutes } from '../features/users/routes';
import { activateRoutes } from '../features/activate/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/works" />,
  },

  ...componentsRoutes,
  ...worksRoutes,
  ...usersRoutes,
  ...activateRoutes,
];

export const RootRouter: FC = () => useRoutes(routes);
