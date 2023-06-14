import React, { FC, memo, useState } from 'react';

import { Typography } from 'antd';

import { SkillsSelect } from '../../../../components/SkillsSelect';

import { UserFolderTabs } from '../../../../components/UserFolderTabs';

import { WorksGrid } from '../../../../components/WorksGrid';

import classes from './WorksPage.module.scss';

const { Text } = Typography;

// TODO ф-ция открывания чтения статьи
// TODO ф-ция для расчета кол-ва колонок работ(стили)

/** Страница Работы. */
const WorksPageComponents: FC = () => {
  /** Выбранные категории.*/
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  return (
    <div className={classes['works-page']}>
      <div className={classes['works-page__works']}>
        <SkillsSelect onChange={setSelectedSkills}/>
        <WorksGrid count={1000} selectedMainSkills={selectedSkills}/>
      </div>

      <div className={`${classes['works-page__popular-users']}`}>
        <Text className={`${classes['works-page__popular-users__header']}`}>Популярные пользователи</Text>
        <UserFolderTabs/>
      </div>
    </div>
  );
};

export const WorksPage = memo(WorksPageComponents);
