import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { componentsRoutes } from '../features/components/routes';
import { worksRoutes } from '../features/works/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/works" />,
  },

  ...componentsRoutes,
  ...worksRoutes,
];

export const RootRouter: FC = () => useRoutes(routes);
