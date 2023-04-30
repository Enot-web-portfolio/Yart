import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import {componentsRoutes} from "../features/components/routes";

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  ...componentsRoutes,
];

export const RootRouter: FC = () => useRoutes(routes);
