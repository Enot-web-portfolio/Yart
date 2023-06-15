import React, { FC, useRef, useState } from 'react';

import { Typography } from 'antd';

import { typedMemo } from '../../../../../../core/utils/typed-memo';

import classes from './TextBlock.module.scss';

const { Text } = Typography;

type Props = Readonly<{
  text: string;
  changeText(text: string): void;
  onClick(): void;
}>;

const TextBlockComponent: FC<Props> = props => {
  const html = useRef(props.text);

  return (
    <div className={`${classes['text-block']}`}>
      {props.text.length === 0 && <Text className={`${classes['text-block__placeholder']}`}>
        Опиши, как ты сотворил мир, о чем думал и т.д.
      </Text>}
      <div contentEditable={true}
        onClick={props.onClick}
        dangerouslySetInnerHTML={{ __html: html.current }}
        className={`${classes['text-block__editor']}`}
        onInput={e => {
             props.changeText(e.currentTarget.innerHTML);
           }}>

      </div>
    </div>
  );
};

export const TextBlock = typedMemo(TextBlockComponent);
