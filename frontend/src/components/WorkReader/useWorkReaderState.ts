import { useState, useEffect } from 'react';

import { Work } from '../../core/models/work';
import { WorksService } from '../../core/services/works-service';

export const useWorkReaderState = (workId: number | null) => {

  /** Reading work. */
  const [work, setWork] = useState<Work | null>(null);

  /** Work is loading. */
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    onDataGet();
  }, [workId]);

  /** Get work. */
  async function onDataGet() {
    if (workId === null) {
      setWork(null);
      return;
    }
    try {
      setIsLoading(true);
      const curWork = await WorksService.getWork(workId);
      setWork(curWork);
      setIsLoading(false);
    } catch (error: unknown) {
      setIsLoading(false);
    }
  }

  return {

    /** Reading work. */
    work,

    /** Work is loading. */
    isLoading,
  };
};
