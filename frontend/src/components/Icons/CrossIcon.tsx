import React, { memo, FC } from 'react';

import { IconProps } from './types';

// Иконка Стрелка с палочкой.
const CrossIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M0.5 1L8.5 9M8.5 1L0.5 9"/>
  </svg>;

// Иконка Стрелка с палочкой
export const CrossIcon = memo(CrossIconComponent);
