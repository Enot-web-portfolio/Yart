import React, { memo, FC } from 'react';

import { IconProps } from './types';

// Иконка Отписка
const UnsubscribeIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width={props.size} height={props.size} viewBox="0 0 22 20" fill="none" stroke="#000" xmlns="http://www.w3.org/2000/svg" {...props} className="user-add_icon">
    <g clipPath="url(#clip0_544_22)">
      <path d="M9.52362 13.3861C12.8841 13.3861 15.6083 10.6619 15.6083 7.30145C15.6083 3.94099 12.8841 1.2168 9.52362 1.2168C6.16316 1.2168 3.43896 3.94099 3.43896 7.30145C3.43896 10.6619 6.16316 13.3861 9.52362 13.3861Z"/>
      <path d="M0.302246 19.7358C2.61668 17.292 5.89215 15.7676 9.52368 15.7676C13.1552 15.7676 16.4307 17.292 18.7451 19.7358"/>
      <line x1="16.231" y1="10.4824" x2="20.945" y2="15.1964"/>
      <line x1="16.1977" y1="15.1963" x2="20.9118" y2="10.4822"/>
    </g>
    <defs>
      <clipPath id="clip0_544_22">
        <rect width="21.9048" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>;

// Иконка Отписка
export const UnsubscribeIcon = memo(UnsubscribeIconComponent);
