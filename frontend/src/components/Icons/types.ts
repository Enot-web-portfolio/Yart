/** Параметры иконки. */
export type IconProps = Readonly<{

  /** Размер иконки. */
  size: IconSize;

  /** Цвет заливки. */
  fill?: string;

  /** Цвет обводки. */
  stroke?: string;

  /** Класс. */
  className?: string;
}>;

/** Размер иконки. */
export enum IconSize {
  Big = 35,
  Middle = 30,
  Small = 20,
  Micro = 15,
}
