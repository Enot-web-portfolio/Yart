import React, { FC } from 'react';

import { Select as SelectAntd, SelectProps } from 'antd';

import { typedMemo } from '../../core/utils/typed-memo';

import { ArrowMiniIcon } from '../Icons';

type Props = Readonly<SelectProps>;

// Компонент Select
const SelectComponent: FC<Props> = props => (
  <SelectAntd
    {...props}
    mode="multiple"
    suffixIcon={<ArrowMiniIcon size={25}/>}
    removeIcon={<img src={'/src/assets/icons/cross.svg'} height={15}/>}>
    {props.children}
  </SelectAntd>
);

// Компонент Select
export const Select = typedMemo(SelectComponent);
