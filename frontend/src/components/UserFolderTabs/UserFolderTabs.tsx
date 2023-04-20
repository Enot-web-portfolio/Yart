import React, { FC } from 'react';
import { Tabs, TabsProps } from 'antd';

import { typedMemo } from '../../core/utils/typed-memo';

import './UserFolderTabs.scss';

type Props = Readonly<TabsProps & {
  users: unknown[];
}>;

// TODO после создания компонента пользователей заменить null на компонент
const UserFolderTabsComponents: FC<Props> = (props: Props) => (
  <div className={'folder_tabs'}>
    <Tabs {...props} type={'card'}/>
    <div className={'folder_tabs__container'}>
      {props.users.map(() => null)}
    </div>
  </div>
);

export const UserFolderTabs = typedMemo(UserFolderTabsComponents);
