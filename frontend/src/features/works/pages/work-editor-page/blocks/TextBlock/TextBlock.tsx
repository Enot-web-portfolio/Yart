import React, { FC } from 'react';

import ReactQuill from 'react-quill';

import { typedMemo } from '../../../../../../core/utils/typed-memo';

import classes from './TextBlock.module.scss';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from './quill-config';

type Props = Readonly<{

  /** Текст блока. */
  text: string;

  /** Ф-ция изменения текста. */
  changeText(text: string): void;
}>;

/**
 * Компонент Блок Текст.
 * @param props
 */
const TextBlockComponent: FC<Props> = props => (
  <div className={`${classes['text-block']}`}>
    <ReactQuill className={'text-editor'}
      placeholder={'Опиши, как ты сотворил мир, о чем думал и т.д.'}
      value={props.text}
      onChange={props.changeText}
      formats={formats}
      modules={modules}
      theme="snow"/>
  </div>
);

export const TextBlock = typedMemo(TextBlockComponent);
