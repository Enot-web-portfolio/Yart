import { WorkBlock } from './work-block';

/** Editing work. */
export type EditingWork = Readonly<{

  /** Work name. */
  workName: string;

  /** Work image url. */
  workImageUrl: string;

  /** Work main skills. */
  workMainSkills: number[];

  /** Work tags. */
  workTags: string[];

  /** Open comments. */
  openComments: boolean;

  /** Work blocks. */
  workBlock: WorkBlock[];

  /** Work additional files. */
  workFileUrls: string[];
}>;
