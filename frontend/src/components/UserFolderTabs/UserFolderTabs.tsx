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
  <div className={'folder-tabs'}>
    <Tabs {...props} type={'card'}/>
    <div className={'folder-tabs__container'}>
      {props.users.map((user, i) =>
        <UserCard {...user}
          classes={{
                    container: 'folder-tabs__user-card',
                    name: 'folder-tabs__user-card_name',
                    works: 'folder-tabs__user-card_works',
                    action: 'folder-tabs__user-card_action',
          }}
          key={i}/>)}
    </div>
  </div>
);

export const UserFolderTabs = typedMemo(UserFolderTabsComponents);
