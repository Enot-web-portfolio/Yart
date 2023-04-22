export interface Category {

  /** Название категории. */
  name: string;

  /** Id категории. */
  id: number;

  /** Фоновый увет категории. */
  backgroundColor: string;

  /** Цвет текста категории. */
  fontColor: string;

  /** Выбрана ли категория. */
  checked: boolean;
}
