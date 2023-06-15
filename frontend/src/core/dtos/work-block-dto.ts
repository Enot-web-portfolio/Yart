import {WorkBlockType} from "../models/work-block";

/** Work block Dto. */
export type WorkBlockDto = Readonly<{

  /** Work block type (Text, Image, Gallery). */
  type: WorkBlockType;

  /** Work block images. */
  image_urls: string[];

  /** Work block text. */
  text: string;

  /** Work block order. */
  order: number;
}>
