/** Параметры иконки. */
export type IconProps = Readonly<{

  /** Размер иконки. */
  size?: IconSize;

  /** Цвет заливки. */
  fill?: string;

  /** Цвет обводки. */
  stroke?: string;

  /** Класс. */
  className?: string;

  /** Ф-ция клика. */
  onClick?: (e: React.MouseEvent) => void;
}>;

/** Размер иконки. */
export enum IconSize {
  Big = 35,
  Middle = 30,
  Small = 20,
  Micro = 15,
}
