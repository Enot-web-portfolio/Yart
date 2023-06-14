import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const ComponentsPage = lazy(() => import('./pages/components-page').then(module => ({ default: module.ComponentsPage })));

export const componentsRoutes: RouteObject[] = [
  {
    path: '/components',
    element: <ComponentsPage/>,
  },
];
