import React, {memo, FC} from 'react';
import {IconProps} from './types';

// Иконка Информация (только обводка)
const InfoLineIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" >
    <circle cx="14" cy="14" r="13.5" fill="none" stroke="black"  {...props}/>
    <path d="M14 19V12.5M13.5 9H14.5" stroke="black"  {...props}/>
  </svg>

// Иконка Информация (только обводка)
export const InfoLineIcon = memo(InfoLineIconComponent);
