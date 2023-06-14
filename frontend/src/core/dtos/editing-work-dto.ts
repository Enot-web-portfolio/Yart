import {WorkBlockDto} from "./work-block-dto";

/** Editing work dto. */
export type EditingWorkDto = Readonly<{

  /** Work name. */
  name: string;

  /** Work image url. */
  image_url: string;

  /** Work main skills. */
  main_skills: number[];

  /** Work tags. */
  tags: string[];

  /** Open comments. */
  open_comments: boolean;

  /** Work blocks. */
  blocks: WorkBlockDto[];

  /** Work additional files. */
  file_urls: string[];
}>

