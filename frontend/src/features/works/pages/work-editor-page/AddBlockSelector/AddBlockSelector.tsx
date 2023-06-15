import React, { FC } from 'react';

import { Typography } from 'antd';

import { typedMemo } from '../../../../../core/utils/typed-memo';

import { CrossIcon } from '../../../../../components/Icons';

import classes from './AddBlockSelector.module.scss';

const { Text } = Typography;

type Props = Readonly<{
  onClick(): void;
}>;

const AddBlockSelectorComponent: FC<Props> = props => (
  <div className={`${classes['add-block-selector']}`}>
    <div className={`${classes['add-block-selector__line']}`}/>
    <div className={`${classes['add-block-selector__btn']}`} onClick={props.onClick}>
      <CrossIcon className={`${classes['add-block-selector__btn_icon']}`}/>
      <Text className={`${classes['add-block-selector__btn_text']}`}>Добавить блок</Text>
    </div>
  </div>
);

export const AddBlockSelector = typedMemo(AddBlockSelectorComponent);
