import React, { FC, memo, useState, useEffect } from 'react';

import { SkillsSelect } from '../../../../components/SkillsSelect';

import { Work } from '../../../../core/models/work';

import { WorksService } from '../../../../core/services/works-service';

import classes from './WorksPage.module.scss';

const WorksPageComponents: FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getWorks();
  });

  const getWorks = async() => {
    const newWorks = await WorksService.getWorks(page, 10, false);
    setWorks(currentWorks => currentWorks.concat(newWorks));
    setPage(currentPage => currentPage + 1);
  };

  return (
    <div className={classes['works-page']}>
      <div className={classes['works-page__best-work']}>

      </div>

      <div className={classes['works-page__works']}>
        <SkillsSelect onChange={setSelectedSkills}/>

      </div>
    </div>
  );
};

export const WorksPage = memo(WorksPageComponents);
