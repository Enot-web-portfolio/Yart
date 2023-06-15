import React, { FC, PropsWithChildren } from 'react';
import { Tag as TagAntd, TagProps } from 'antd';

import { typedMemo } from '../../core/utils/typed-memo';

import classes from './Tag.module.scss';

type Props = Readonly<TagProps & PropsWithChildren & {

  /** Цвет текст тега. */
  textColor: string;
}>;

// Компонент Тег
const TagComponent: FC<Props> = (props: Props) => (
  <TagAntd {...props}
    className={classes.tag}
    style={{ color: props.textColor }}>
    {props.children}
  </TagAntd>
);

// Компонент Тег
export const Tag = typedMemo(TagComponent);
