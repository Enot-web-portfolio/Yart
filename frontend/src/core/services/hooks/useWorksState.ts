import { useState, useEffect } from 'react';

import { Work } from '../../models/work';
import { WorksService } from '../works-service';

type Props = {
  count: number;
  page: number;
  selectedMainSkills?: number[] | string[];
  search?: string;
  userId?: number | string;
  onlySubscriptions?: boolean;
};

export const useWorksState = (props: Props) => {
  const [works, setWorks] = useState<Work[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    onDataGet();
  }, [props.selectedMainSkills, props.search, props.userId, props.page]);

  /** Get works. */
  async function onDataGet() {
    setIsEmpty(false);
    setIsLoading(true);
    try {
      const newWorks = await WorksService.getWorks(props.page, props.count, props.onlySubscriptions ?? false, props.userId, props.selectedMainSkills);
      setWorks(currentWorks => currentWorks ? currentWorks.concat(newWorks) : newWorks);
      setIsEmpty(newWorks.length === 0);
    } catch (error: unknown) {
      setIsEmpty(true);
    }
    setIsLoading(false);
  }

  return {
    /** Works. */
    works,

    /** Is loading. */
    isLoading,

    /** Is error. */
    isEmpty,
  };
};
