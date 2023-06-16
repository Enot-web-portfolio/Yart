import { WorkBlock } from './work-block';

/** Work. */
export type Work = Readonly<{

  /** Work blocks. */
  workBlocks: WorkBlock[];

  /** User name. */
  userFirstName: string;

  /** User lastname. */
  userLastName: string;

  /** User avatar url */
  userImageUrl: string | null;

  /** User id */
  userId: number;

  /** User main skills. */
  userMainSkills: number[];

  /** User is subscribe. */
  userIsSubscribe: boolean;

  /** Work skills. */
  workMainSkills: readonly number[];

  /** Work likes. */
  workLikesCount: number;

  /** Work avatar url. */
  workImageUrl: string | null;

  /** Work start text. */
  workStartText: string | null;

  /** Work name. */
  workName: string;

  /** Work id. */
  workId: number;

  /** Work was like current user .*/
  workIsLike: boolean;
}>;
