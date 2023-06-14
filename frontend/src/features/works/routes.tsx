import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const WorksPage = lazy(() => import('./pages/works-page').then(module => ({ default: module.WorksPage })));
const WorkEditorPage = lazy(() => import('./pages/work-editor-page').then(module => ({ default: module.WorkEditorPage })));

export const worksRoutes: RouteObject[] = [
  {
    path: '/works',
    element: <WorksPage/>,
  },
  {
    path: '/work/:id/editor',
    element: <WorkEditorPage/>,
  },
];
