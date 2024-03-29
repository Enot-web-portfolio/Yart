import React, { FC, memo } from 'react';

import { useParams } from 'react-router-dom';

import { WorksGrid } from '../../../../../../components/WorksGrid';

/** Компонент Работы (Пользователь). */
const UserWorksPageComponent: FC = () => {

  /** Id пользователя. */
  const { id } = useParams<{ id: string; }>();

  return (
    <WorksGrid count={1000} userId={id}/>
  );
};

export const UserWorksPage = memo(UserWorksPageComponent);
