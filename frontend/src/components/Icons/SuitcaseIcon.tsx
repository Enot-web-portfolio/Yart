import React, {memo, FC} from 'react';
import {IconProps} from './types';

// Иконка Чемодан
const SuitcaseIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000"  {...props}>
    <path
      d="M11.5 4H2.5C2.5 4 1 4 1 5.5C1 7 1 23 1 23C1 23 1 25 3 25H28.5C28.5 25 30 24.5 30 23V6C30 6 30 4 28 4H19.5M11.5 4V2.5C11.5 2.5 11.5 1 12.5 1H18.5C18.5 1 19.5 1 19.5 2V4M11.5 4H19.5"/>
    <path
      d="M1 11.5C1 11.5 6 13.5 14 13.5M14 13.5V15C14 15 14 15.5 14.5 15.5H16.5C16.5 15.5 17 15.5 17 15V13.5M14 13.5V11.5C14 11 14.5 11 14.5 11H16.5C17 11 17 11.5 17 11.5V13.5M17 13.5C17 13.5 24.5 14 30 11.5"/>
  </svg>

// Иконка Чемодан
export const SuitcaseIcon = memo(SuitcaseIconComponent);
