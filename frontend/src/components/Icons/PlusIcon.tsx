import React, {memo, FC} from 'react';
import {IconProps} from './types';

// Иконка Плюс
const PlusIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width="33" height="34" viewBox="0 0 33 34" fill="none" stroke="#000" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16.5 0V34M0 17H33"/>
  </svg>

// Иконка Плюс
export const PlusIcon = memo(PlusIconComponent);
