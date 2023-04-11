import React, {memo, FC} from 'react';
import {IconProps} from './types';

// Иконка Сердце (только обводка)
const HeartLineIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000"  {...props}>
    <path
      d="M15 24.0139C15 24.0139 29.5 17.0139 28.5 7.01389C28.5 7.01389 28.5 1.5 22 1.01389C22 1.01389 17.5 0.513889 15 5.51389"/>
    <path
      d="M15.5 24C15.5 24 0.499375 17.0112 1.49942 7.01289C1.49942 7.01289 1.49942 1.49993 7.99968 1.0139C7.99968 1.0139 12.4999 0.500845 15 5.5"/>
    <path d="M14.5 5L15 6L15.5 5" stroke-width="0.6"/>
  </svg>

// Иконка Сердце (только обводка)
export const HeartLineIcon = memo(HeartLineIconComponent);
