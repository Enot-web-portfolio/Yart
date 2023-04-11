import React, {memo, FC} from 'react';
import {IconProps} from './types';

// Иконка Информация (закрашенно)
const InfoFillIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width="28" height="28" viewBox="0 0 28 28" fill="#000" stroke="#000" xmlns="http://www.w3.org/2000/svg"  {...props}>
    <circle cx="14" cy="14" r="13.5"/>
    <path d="M14 20V12" stroke="white" stroke-width="2"/>
    <circle cx="14" cy="9" r="1.5" fill="white"/>
  </svg>

// Иконка Информация (закрашенно)
export const InfoFillIcon = memo(InfoFillIconComponent);
