import React, { FC, memo, useState, useEffect } from 'react';

import { SkillsSelect } from '../../../../components/SkillsSelect';

import { Work } from '../../../../core/models/work';

import { WorksService } from '../../../../core/services/works-service';

import { WorkCard } from '../../../../components/WorkCard';

import classes from './WorksPage.module.scss';

// TODO ф-ция открывания чтения статьи
// TODO ф-ция для расчета кол-ва колонок работ(стили)
const workss: Work[] = [
  {
    workId: 1,
    workIsLike: false,
    workName: 'hdfrt',
    workStartText: 'daw',
    workImageUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
    workMainSkills: [],
    workLikesCount: 0,
    userId: 2,
    userFirstName: 'daw',
    userImageUrl: null,
    userLastName: 'dawd',
  },
  {
    workId: 1,
    workIsLike: false,
    workName: 'hdfrt',
    workStartText: 'daw',
    workImageUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
    workMainSkills: [],
    workLikesCount: 0,
    userId: 2,
    userFirstName: 'daw',
    userImageUrl: null,
    userLastName: 'dawd',
  },
  {
    workId: 1,
    workIsLike: true,
    workName: 'hdfrt',
    workStartText: 'daw',
    workImageUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
    workMainSkills: [],
    workLikesCount: 0,
    userId: 2,
    userFirstName: 'daw',
    userImageUrl: null,
    userLastName: 'dawd',
  },
];
const WorksPageComponents: FC = () => {
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [works, setWorks] = useState<Work[]>(workss);
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
        <div className={`${classes['works-page__works_grid']}`}>
          {works.map((work, i) =>
            <WorkCard key={i} {...work} onWorkClick={() => {}}/>)}
        </div>
      </div>
    </div>
  );
};

export const WorksPage = memo(WorksPageComponents);
