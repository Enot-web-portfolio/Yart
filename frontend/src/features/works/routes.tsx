import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const WorksPage = lazy(() => import('./pages/works-page').then(module => ({ default: module.WorksPage })));

export const worksRoutes: RouteObject[] = [
  {
    path: '/works',
    element: <WorksPage/>,
  },
];
