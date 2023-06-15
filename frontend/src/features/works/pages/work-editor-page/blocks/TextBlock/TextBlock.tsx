import React, { FC } from 'react';

import ReactQuill from 'react-quill';

import { typedMemo } from '../../../../../../core/utils/typed-memo';

import classes from './TextBlock.module.scss';
import 'react-quill/dist/quill.snow.css';

type Props = Readonly<{
  text: string;
  changeText(text: string): void;
}>;

const TextBlockComponent: FC<Props> = props => {
  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'indent', 'link', 'align'];
  const modules = { toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], [{ align: ['', 'right', 'center'] }], ['link', 'clean']] };

  return (
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
};

export const TextBlock = typedMemo(TextBlockComponent);
