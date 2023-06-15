import React, { FC } from 'react';

import { Typography } from 'antd';

import { typedMemo } from '../../../../../../core/utils/typed-memo';

import { WorkBlock, WorkBlockType } from '../../../../../../core/models/work-block';

import classes from './SelectBlock.module.scss';

const { Text } = Typography;

type Props = Readonly<{

  /** Класс заголовка. */
  headerClassName: string;

  /** Ф-ция добавления блока. */
  addBlock(block: WorkBlock): void;
}>;

/**
 * Компонент Выбор блока работы для вставки.
 * @param props
 */
const SelectBlockComponent: FC<Props> = props => {

  /**
   * Ф-ция создания блока работы.
   * @param type - Тип блока.
   */
  const createBlock = (type: WorkBlockType): WorkBlock => ({
    blockType: type,
    blockText: '',
    blockOrder: -1,
    blockImageUrls: [],
  });

  return (
    <>
      <Text className={`${props.headerClassName}`}>Выбрать блок</Text>
      <div className={`${classes['select-block__type']}`} onClick={() => props.addBlock(createBlock(WorkBlockType.Text))}>
        <img src="/src/assets/icons/text.svg" alt="text block"
          className={`${classes['select-block__type_icon']}`}/>
        <Text className={`${classes['select-block__type_text']}`}>Текст</Text>
      </div>
      <div className={`${classes['select-block__type']}`} onClick={() => props.addBlock(createBlock(WorkBlockType.Image))}>
        <img src="/src/assets/icons/image.svg" alt="text block"
          className={`${classes['select-block__type_icon']}`}/>
        <Text className={`${classes['select-block__type_text']}`}>Изображение</Text>
      </div>
      {/* <div className={`${classes['select-block__type']}`}
            onClick={() => props.addBlock(createBlock(WorkBlockType.Gallery))}>
        <img src="/src/assets/icons/gallery.svg" alt="text block"
             className={`${classes['select-block__type_icon']}`}/>
        <Text className={`${classes['select-block__type_text']}`}>Галерея</Text>
      </div>*/}
    </>
  );
};

export const SelectBlock = typedMemo(SelectBlockComponent);
