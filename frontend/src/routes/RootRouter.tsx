import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { componentsRoutes } from '../features/components/routes';
import { worksRoutes } from '../features/works/pages/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  ...componentsRoutes,
  ...worksRoutes,
];

export const RootRouter: FC = () => useRoutes(routes);
