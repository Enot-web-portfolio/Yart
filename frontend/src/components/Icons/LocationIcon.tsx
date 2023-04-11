import React, {memo, FC} from 'react';
import {IconProps} from './types';

// Иконка Местоположение
const LocationIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000" {...props}>
    <path
      d="M22.5001 9.11422C25 18.5324 12.0001 30.6142 12.0001 30.6142L10.5001 29.1145C-0.499867 18.6145 1.50013 9.11422 1.50013 9.11422C4 0.0322266 12.0001 1.0326 12.0001 1.0326C21.5 1.03225 22.5001 9.11422 22.5001 9.11422Z"/>
    <circle cx="12" cy="12" r="4.5"/>
  </svg>

// Иконка Местоположение
export const LocationIcon = memo(LocationIconComponent);
