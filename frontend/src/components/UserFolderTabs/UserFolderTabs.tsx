import React, { FC } from 'react';
import { Tabs, TabsProps } from 'antd';

import { typedMemo } from '../../core/utils/typed-memo';

import './UserFolderTabs.scss';
import { ShortUser } from '../../core/models/short-user';
import { UserCard } from '../UserCard';

type Props = Readonly<TabsProps & {
  users: ShortUser[];
}>;

const UserFolderTabsComponents: FC<Props> = (props: Props) => (
  <div className={'folder_tabs'}>
    <Tabs {...props} type={'card'}/>
    <div className={'folder_tabs__container'}>
      {props.users.map((user, i) => <UserCard {...user} key={i}/>)}
    </div>
  </div>
);

export const UserFolderTabs = typedMemo(UserFolderTabsComponents);
