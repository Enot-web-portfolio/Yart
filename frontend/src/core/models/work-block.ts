/** Work block. */
export type WorkBlock = Readonly<{

  /** Work block type (Text, Image, Gallery). */
  blockType: WorkBlockType;

  /** Work block images. */
  blockImageUrls: string[];

  /** Work block text. */
  blockText: string;

  /** Work block order. */
  blockOrder: number;
}>;

/** Type work block. */
export enum WorkBlockType {
  Text = 0,
  Image = 1,
  Gallery = 2,
}
