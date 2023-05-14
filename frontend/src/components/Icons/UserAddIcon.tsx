import React, { memo, FC } from 'react';

import { IconProps } from './types';

// Иконка Пользователь с плюсом
const UserAddIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width={props.size} height={props.size} viewBox="0 0 22 20" fill="none" stroke="#000" xmlns="http://www.w3.org/2000/svg" {...props} className="user-add_icon">
    <g clipPath="url(#clip0_127_732)">
      <path
        d="M9.52377 13.3861C12.8842 13.3861 15.6084 10.6619 15.6084 7.30145C15.6084 3.94099 12.8842 1.2168 9.52377 1.2168C6.16331 1.2168 3.43912 3.94099 3.43912 7.30145C3.43912 10.6619 6.16331 13.3861 9.52377 13.3861Z"/>
      <path
        d="M0.302277 19.7353C2.61671 17.2915 5.89218 15.7671 9.52371 15.7671C13.1552 15.7671 16.4307 17.2915 18.7451 19.7353"/>
      <line x1="18.5952" y1="9.52393" x2="18.5952" y2="16.1906"/>
      <line x1="15.2381" y1="12.8335" x2="21.9048" y2="12.8335"/>
    </g>
    <defs>
      <clipPath id="clip0_127_732">
        <rect width="21.9048" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>;

// Иконка Пользователь с плюсом
export const UserAddIcon = memo(UserAddIconComponent);
