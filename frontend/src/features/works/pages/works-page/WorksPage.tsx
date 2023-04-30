import React, { FC, memo, useState } from 'react';

import { CategorySelect } from '../../../../components/CategorySelect';

import classes from './WorksPage.module.scss';

const WorksPageComponents: FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  return (
    <div className={classes['works-page']}>
      <div className={classes['works-page__best-work']}>

      </div>

      <div className={classes['works-page__works']}>
        <CategorySelect categories={} onChange={}/>
      </div>
    </div>
  );
};

export const WorksPage = memo(WorksPageComponents);
