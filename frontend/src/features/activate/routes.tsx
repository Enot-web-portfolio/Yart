import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const ActivatePage = lazy(() => import('./pages/activate-page').then(module => ({ default: module.ActivatePage })));

export const activateRoutes: RouteObject[] = [
  {
    path: '/activate/:uid/:token',
    element: <ActivatePage/>,
  },
];
