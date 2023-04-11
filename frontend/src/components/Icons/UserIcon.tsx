import React, {memo, FC} from 'react';
import {IconProps} from './types';

// Иконка Пользователь
const UserIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width="35" height="35" viewBox="0 0 35 35" fill="none" stroke="#000" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clip-path="url(#clip0_123_665)">
      <path
        d="M17.5 22.8474C23.6749 22.8474 28.6806 17.8417 28.6806 11.6669C28.6806 5.49203 23.6749 0.486328 17.5 0.486328C11.3252 0.486328 6.31946 5.49203 6.31946 11.6669C6.31946 17.8417 11.3252 22.8474 17.5 22.8474Z"/>
      <path
        d="M0.55542 34.5138C4.80818 30.0233 10.8269 27.2222 17.4998 27.2222C24.1727 27.2222 30.1914 30.0233 34.4442 34.5138"/>
    </g>
    <defs>
      <clipPath id="clip0_123_665">
        <rect width="35" height="35" fill="white"/>
      </clipPath>
    </defs>
  </svg>

// Иконка Пользователь
export const UserIcon = memo(UserIconComponent);
