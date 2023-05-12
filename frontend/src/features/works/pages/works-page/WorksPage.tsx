import React, { FC, memo, useState, useEffect } from 'react';

import { SkillsSelect } from '../../../../components/SkillsSelect';

import { Work } from '../../../../core/models/work';

import { WorksService } from '../../../../core/services/works-service';

import { WorkCard } from '../../../../components/WorkCard';

import classes from './WorksPage.module.scss';
import { PopularUsers } from './PopularUsers';

// TODO ф-ция открывания чтения статьи
// TODO ф-ция для расчета кол-ва колонок работ(стили)

const WorksPageComponents: FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [works, setWorks] = useState<Work[] | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getWorks();
  }, []);

  const getWorks = async() => {
    const newWorks = await WorksService.getWorks(page, 10, false);
    setWorks(currentWorks => currentWorks ? currentWorks.concat(newWorks) : newWorks);
    setPage(currentPage => currentPage + 1);
  };

  if (!works) {
return null;
}
  return (
    <div className={classes['works-page']}>
      <div className={classes['works-page__best-work']}>

      </div>

      <div className={classes['works-page__works']}>
        <SkillsSelect onChange={setSelectedSkills}/>
        <div className={`${classes['works-page__works_grid']}`}>
          {works.map((work, i) =>
            <WorkCard key={i} {...work} onWorkClick={() => {}}/>)}
        </div>
      </div>

      <PopularUsers/>

    </div>
  );
};

export const WorksPage = memo(WorksPageComponents);
