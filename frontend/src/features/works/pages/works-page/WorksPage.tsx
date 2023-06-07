import React, { FC, memo, useState, useEffect } from 'react';

import { Spin, Typography } from 'antd';

import { SkillsSelect } from '../../../../components/SkillsSelect';

import { Work } from '../../../../core/models/work';

import { WorksService } from '../../../../core/services/works-service';

import { WorkCard } from '../../../../components/WorkCard';

import { UserFolderTabs } from '../../../../components/UserFolderTabs';

import { AppError } from '../../../../core/models/app-error';
import { EmptyResult } from '../../../../components/EmptyResult';
import { ErrorResult } from '../../../../components/ErrorResult';

import classes from './WorksPage.module.scss';

const { Text } = Typography;

// TODO ф-ция открывания чтения статьи
// TODO ф-ция для расчета кол-ва колонок работ(стили)

/** Страница Работы. */
const WorksPageComponents: FC = () => {
  /** Выбранные категории.*/
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  /** Работы. */
  const [works, setWorks] = useState<Work[] | null>(null);

  /** Загружаются ли работы. */
  const [loading, setLoading] = useState(true);

  /** Ошибка при загрузке работ. */
  const [error, setError] = useState<AppError<Work[]> | null>(null);

  const [page, setPage] = useState(1);

  useEffect(() => {
    getWorks();
  }, [selectedSkills]);

  const getWorks = async() => {
    setLoading(true);
    try {
      const newWorks = await WorksService.getWorks(page, 10, false, undefined, selectedSkills);
      setWorks(currentWorks => currentWorks ? currentWorks.concat(newWorks) : newWorks);
      setPage(currentPage => currentPage + 1);
    } catch (error: unknown) {
      if (error instanceof AppError<Work[]>) {
        setError(error);
      }
    }
    setLoading(false);
  };

  return (
    <div className={classes['works-page']}>
      <div className={classes['works-page__works']}>
        <SkillsSelect onChange={setSelectedSkills}/>
        {loading ?
          <Spin/> :
          works !== null ?
            works.length === 0 ?
              <EmptyResult/> :
              <div className={`${classes['works-page__works_grid']}`}>
                {works.map((work, i) =>
                  <WorkCard key={i} {...work} onWorkClick={() => {
                  }}/>)}
              </div> :
            <ErrorResult/>}
      </div>

      <div className={`${classes['works-page__popular-users']}`}>
        <Text className={`${classes['works-page__popular-users__header']}`}>Популярные пользователи</Text>
        <UserFolderTabs/>
      </div>

    </div>
  );
};

export const WorksPage = memo(WorksPageComponents);
