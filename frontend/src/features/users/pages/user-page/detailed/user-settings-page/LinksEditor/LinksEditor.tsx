import React, { FC, Dispatch, SetStateAction } from 'react';

import { Button, Input, Typography } from 'antd';

import { typedMemo } from '../../../../../../../core/utils/typed-memo';
import { CrossIcon } from '../../../../../../../components/Icons';
import { IconSize } from '../../../../../../../components/Icons/types';

import classes from './LinksEditor.module.scss';

const { Text } = Typography;

type Props = Readonly<{
  links: string[];
  setLinks: Dispatch<SetStateAction<string[]>>;
  className: string;
}>;

const LinksEditorComponent: FC<Props> = ({ links, setLinks, className }) => {
  const deleteLink = (order: number) => {
    setLinks(curLinks =>
      curLinks.filter((_, i) => i !== order));
  };

  const addLink = () => {
    setLinks(curLinks => [...curLinks, '']);
  };

  const changeLink = (order: number, value: string) => {
    setLinks(curLinks =>
      curLinks.map((link, i) => i === order ? value : link));
  };

  return (
    <div className={`${classes['links-editor']} ${className}`}>
      <Text className={`${classes['links-editor__header']}`}>Ссылки</Text>
      {links.map((link, i) =>
        <Input value={link}
          key={i}
          suffix={links.length > 1 && <CrossIcon size={IconSize.Middle}
            onClick={() => deleteLink(i)}
            className={`${classes['links-editor__delete']}`}/>}
          placeholder={'Ссылка'}
          onChange={event => changeLink(i, event.target.value)}/>)}
      <Button type={'default'}
        className={`${classes['links-editor__add']}`}
        onClick={addLink}
        icon={<img src={'/src/assets/icons/plus.svg'}
          className={`${classes['links-editor__add_icon']}`}
          alt={'add link'}/>}/>
    </div>
  );
};

export const LinksEditor = typedMemo(LinksEditorComponent);
