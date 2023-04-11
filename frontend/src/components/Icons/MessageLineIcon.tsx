import React, {memo, FC} from 'react';
import {IconProps} from './types';

// Иконка Сообщение (только обводка)
const MessageLineIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width="30" height="25" viewBox="0 0 30 25" xmlns="http://www.w3.org/2000/svg" stroke="#000" fill="none"  {...props}>
    <path
      d="M4.5 19.5C0.5 19.5 0.5 15 0.5 15V6.5C0.5 1 4.5 1 4.5 1H24.5C29.5 1 29.5 5 29.5 5V15C29.5 20 25.5 19.5 25.5 19.5H24L23 23.5L20.5 19.5H4.5Z"/>
  </svg>

// Иконка Сообщение (только обводка)
export const MessageLineIcon = memo(MessageLineIconComponent);
