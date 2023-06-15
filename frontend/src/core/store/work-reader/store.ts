import { create } from 'zustand';

import { WorkReaderState, WorkReaderActions } from './types';
import { initialState } from './state';

export const useWorkReaderStore = create<WorkReaderState & WorkReaderActions>(set => ({
  ...initialState,
  close() {
    set(() => ({ workId: null }));
  },
  open(workId) {
    set(() => ({ workId }));
  },
}));
