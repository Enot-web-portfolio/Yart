/** Work. */
export type Work = Readonly<{

  /** User name. */
  userFirstName: string;

  /** User lastname. */
  userLastName: string;

  /** User avatar url */
  userImageUrl: string | null;

  /** User id */
  userId: number;

  /** Work skills. */
  workMainSkills: string[];

  /** Work likes. */
  workLikesCount: number;

  /** Work avatar url. */
  workImageUrl: string | null;

  /** Work start text. */
  workStartText: string;

  /** Work name. */
  workName: string;

  /** Work id. */
  workId: number;

  /** Work was like current user .*/
  workIsLike: boolean;
}>;
