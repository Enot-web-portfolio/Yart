import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { toUser, toUserAbout, toUsers, toUserSettings, toUserSubscribe, toUserWorks } from '../../routes/route-links';

const UsersPage = lazy(() => import('./pages/users-page').then(module => ({ default: module.UsersPage })));
const UserPage = lazy(() => import('./pages/user-page').then(module => ({ default: module.UserPage })));
const UserAboutPage = lazy(() => import('./pages/user-page/detailed/user-about-page').then(module => ({ default: module.UserAboutPage })));
const UserSubscribePage = lazy(() => import('./pages/user-page/detailed/user-subscribe-page').then(module => ({ default: module.UserSubscribePage })));
const UserSettingsPage = lazy(() => import('./pages/user-page/detailed/user-settings-page').then(module => ({ default: module.UserSettingsPage })));
const UserWorksPage = lazy(() => import('./pages/user-page/detailed/user-works-page').then(module => ({ default: module.UserWorksPage })));

export const usersRoutes: RouteObject[] = [
  {
    path: toUsers(),
    element: <UsersPage/>,
  },
  {
    path: toUser(':id'),
    element: <UserPage/>,
    children: [
      {
        path: toUserWorks(':id'),
        element: <UserWorksPage/>,
      },
      {
        path: toUserAbout(':id'),
        element: <UserAboutPage/>,
      },
      {
        path: toUserSettings(':id'),
        element: <UserSettingsPage/>,
      },
      {
        path: toUserSubscribe(':id'),
        element: <UserSubscribePage/>,
      },
    ],
  },
];
