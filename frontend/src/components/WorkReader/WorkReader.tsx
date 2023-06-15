import React, {FC, memo} from 'react';

import classes from './WorkReader.module.scss'
import {useWorkReaderStore} from "../../core/store/work-reader/store";

const WorkReaderComponent: FC = () => {
  const workId = useWorkReaderStore(store => store.workId);
  const close = useWorkReaderStore(store => store.close);
  
  return(

  )
}

export const WorkReader = memo(WorkReaderComponent)
