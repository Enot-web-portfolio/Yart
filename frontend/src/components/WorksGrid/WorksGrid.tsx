import React, { FC, useState, useEffect } from 'react';

import { Spin } from 'antd';

import { useWorksState } from '../../core/services/hooks/useWorksState';
import { EmptyResult } from '../EmptyResult';
import { WorkCard } from '../WorkCard';
import { ErrorResult } from '../ErrorResult';

import { typedMemo } from '../../core/utils/typed-memo';

import classes from './WorksGrid.module.scss';

type Props = Readonly<{

  /** Выбранные основные скиллы. */
  selectedMainSkills?: number[] | string[];

  /** Id пользователя, чьи работы ищутся. */
  userId?: number | string;

  /** Кол-во работ на странице. */
  count: number;

  /** Значение поиска работ. */
  search?: string;
}>;

/**
 * Компонетн Сетка работ.
 * @param props
 */
const WorksGridComponent: FC<Props> = props => {

  /** Текущая страница работ. */
  const [page, setPage] = useState(1);

  const { works, isLoading } = useWorksState({ page, count: props.count, search: props.search, userId: props.userId });

  useEffect(() => {
    setPage(1);
  }, [props.selectedMainSkills, props.userId, props.count, props.search]);

  if (isLoading && works === null) {
    return <Spin/>;
  }
  if (works === null) {
    return <ErrorResult/>;
  }
  if (works.length === 0) {
    return <EmptyResult/>;
  }
  return (
    <div className={`${classes['works-grid__wrapper']}`}>
      <div className={`${classes['works-grid']}`}>
        {works.map((work, i) =>
          <WorkCard key={i} {...work} pageUserId={props.userId}/>)}
      </div>
      {isLoading && <Spin/>}
    </div>
  );
};

export const WorksGrid = typedMemo(WorksGridComponent);
