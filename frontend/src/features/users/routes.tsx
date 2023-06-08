import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { toUser, toUserAbout, toUserSettings, toUserSubscribe, toUserWorks } from '../../routes/route-links';

const UsersPage = lazy(() => import('./pages/users-page').then(module => ({ default: module.UsersPage })));
const UserPage = lazy(() => import('./pages/user-page').then(module => ({ default: module.UserPage })));

export const usersRoutes: RouteObject[] = [
  {
    path: '/users',
    element: <UsersPage/>,
  },
  {
    path: toUser(':id'),
    element: <UserPage/>,
    children: [
      {
        path: toUserWorks(':id'),
        element: null,
      },
      {
        path: toUserAbout(':id'),
        element: null,
      },
      {
        path: toUserSettings(':id'),
        element: null,
      },
      {
        path: toUserSubscribe(':id'),
        element: null,
      },
    ],
  },
];
