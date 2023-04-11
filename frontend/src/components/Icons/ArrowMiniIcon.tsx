import React, {memo, FC} from 'react';
import {IconProps} from './types';

// Иконка Стрелка без палочки
const ArrowMiniIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width="33" height="17" viewBox="0 0 33 17" fill="none" stroke="#000" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1 0.5L16.5 16L32 0.5"/>
  </svg>

// Иконка Стрелка без палочки
export const ArrowMiniIcon = memo(ArrowMiniIconComponent);
