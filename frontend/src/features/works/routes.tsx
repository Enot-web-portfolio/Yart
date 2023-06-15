import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { toWorkEditor, toWorks } from '../../routes/route-links';

const WorksPage = lazy(() => import('./pages/works-page').then(module => ({ default: module.WorksPage })));
const WorkEditorPage = lazy(() => import('./pages/work-editor-page').then(module => ({ default: module.WorkEditorPage })));

export const worksRoutes: RouteObject[] = [
  {
    path: toWorks(),
    element: <WorksPage/>,
  },
  {
    path: toWorkEditor(':id'),
    element: <WorkEditorPage/>,
  },
];
