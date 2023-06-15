import React, { FC, memo } from 'react';

import { useWorkReaderStore } from '../../core/store/work-reader/store';

import classes from './WorkReader.module.scss';

const WorkReaderComponent: FC = () => {
  const workId = useWorkReaderStore(store => store.workId);
  const close = useWorkReaderStore(store => store.close);

  return (
    <div className={`${classes['work-reader']}`}>
      <div className="work-reader__header">

      </div>
    </div>
  );
};

export const WorkReader = memo(WorkReaderComponent);
