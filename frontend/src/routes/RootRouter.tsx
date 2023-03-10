import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { authRoutes } from 'src/features/auth/routes';
import { homeRoutes } from 'src/features/home/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  ...homeRoutes,
  ...authRoutes,
];

export const RootRouter: FC = () => useRoutes(routes);
