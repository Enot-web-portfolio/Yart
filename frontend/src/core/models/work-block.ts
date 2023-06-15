/** Work block. */
export type WorkBlock = {

  /** Work block type (Text, Image, Gallery). */
  readonly blockType: WorkBlockType;

  /** Work block images. */
  blockImageUrls: string[];

  /** Work block text. */
  blockText: string;

  /** Work block order. */
  blockOrder: number;

  /** Block image file. */
  blockImage?: File | null;
};

/** Type work block. */
export enum WorkBlockType {
  Text = 0,
  Image = 1,
  Gallery = 2,
}
