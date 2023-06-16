import {WorkBlockDto} from "./work-block-dto";

/** Work Dto. */
export type WorkDto = Readonly<{

  /** Work blocks. */
  blocks?: WorkBlockDto[];

  /** User name. */
  user_first_name: string;

  /** User lastname. */
  user_last_name: string;

  /** User avatar url */
  user_image_url: string | null;

  /** User id */
  user_id: number;

  /** Work skills. */
  main_skills: readonly number[];

  /** Work likes. */
  likes_count: number;

  /** Work avatar url. */
  image_url: string;

  /** Work start text. */
  start_text: string | null;

  /** Work name. */
  name: string;

  /** Work id. */
  id: number;

  /** Work was like current user .*/
  isLike: boolean;
}>
