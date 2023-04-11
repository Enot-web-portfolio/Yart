import React, {memo, FC} from 'react';
import {IconProps} from './types';

// Иконка Крест
const CrossIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width="9" height="10" viewBox="0 0 9 10" fill="none" stroke="#000" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M0.5 1L8.5 9M8.5 1L0.5 9"/>
  </svg>

// Иконка Крест
export const CrossIcon = memo(CrossIconComponent);
