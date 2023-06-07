import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const UsersPage = lazy(() => import('./pages/users-page').then(module => ({ default: module.UsersPage })));

export const usersRoutes: RouteObject[] = [
  {
    path: '/users',
    element: <UsersPage/>,
  },
];
