import React, { FC, useState, useEffect } from 'react';

import { Spin } from 'antd';

import { useWorksState } from '../../core/services/hooks/useWorksState';
import { EmptyResult } from '../EmptyResult';
import { WorkCard } from '../WorkCard';
import { ErrorResult } from '../ErrorResult';

import { typedMemo } from '../../core/utils/typed-memo';

import classes from './WorksGrid.module.scss';

type Props = Readonly<{
  selectedMainSkills?: number[] | string[];
  userId?: number | string;
  count: number;
  search?: string;
}>;

const WorksGridComponent: FC<Props> = props => {
  const [page, setPage] = useState(1);
  const { works, isLoading } = useWorksState({ page, count: props.count, search: props.search });

  useEffect(() => {
    setPage(1);
  }, [props.selectedMainSkills, props.userId, props.count, props.search]);

  return (
    <div className={`${classes['works-grid__wrapper']}`}>
      {isLoading && works === null ?
        <Spin/> :
        works == null ?
          <ErrorResult/> :
          works.length === 0 ?
            <EmptyResult/> :
            <div className={`${classes['works-grid']}`}>
              {works.map((work, i) =>
                <WorkCard key={i} {...work} onWorkClick={() => {
                }}/>)}
            </div>
      }
      {isLoading && works !== null && <Spin/>}
    </div>
  );
};

export const WorksGrid = typedMemo(WorksGridComponent);
