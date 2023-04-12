import React, { memo, FC } from 'react';

import { IconProps } from './types';

// Иконка Стрелка с палочкой.
const ArrowIconComponent: FC<IconProps> = (props: IconProps) =>
  <svg width={props.size} height={props.size} viewBox="0 0 36 13" fill="none" stroke="#000" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M0.5 6.5H34.5M34.5 6.5L28.5 1M34.5 6.5L28.5 12"/>
  </svg>;

// Иконка Стрелка с палочкой
export const ArrowIcon = memo(ArrowIconComponent);
