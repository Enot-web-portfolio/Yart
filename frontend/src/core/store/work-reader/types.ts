/** Current user state. */
export interface WorkReaderState {

  /** Work id. */
  workId: number | null;
}

/** Current user actions. */
export interface WorkReaderActions {

  /** Close work reader. */
  close(): void;

  /** Open work reader. */
  open(workId: number): void;
}
