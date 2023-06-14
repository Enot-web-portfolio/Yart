import React, { FC, Dispatch, SetStateAction } from 'react';

import { Button, Input, Typography } from 'antd';

import { typedMemo } from '../../../../../../../core/utils/typed-memo';
import { CrossIcon } from '../../../../../../../components/Icons';
import { IconSize } from '../../../../../../../components/Icons/types';

import classes from './LinksEditor.module.scss';

const { Text } = Typography;

type Props = Readonly<{

  /** Дополнительныее ссылки. */
  links: string[];

  /** Ф-ция сохранения ссылок. */
  setLinks: Dispatch<SetStateAction<string[]>>;

  /** Класс для редактора ссылок. */
  className: string;
}>;

/** Компонент Редактор дополнительных ссылок Пользователя. */
const LinksEditorComponent: FC<Props> = ({ links, setLinks, className }) => {

  /**
   * Ф-ция удаления ссылки.
   * @param order - Порядковый номер ссылки.
   */
  const deleteLink = (order: number) => {
    setLinks(curLinks =>
      curLinks.filter((_, i) => i !== order));
  };

  /** Ф-ция добавления ссылки. */
  const addLink = () => {
    setLinks(curLinks => [...curLinks, '']);
  };

  /**
   * Ф-ция изменения ссылки.
   * @param order - Порядковый номер ссылки.
   * @param value - Значение ссылки.
   */
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
