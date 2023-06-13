import React, { FC, memo, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Input, Spin } from 'antd';

import { useUsersState } from '../../../../../../core/services/hooks/useUsersState';
import { UserCard } from '../../../../../../components/UserCard';
import { EmptyResult } from '../../../../../../components/EmptyResult';

import classes from './UserSubscribePage.module.scss';

/** Компонент Подписки (Пользователь). */
const UserSubscribePageComponent: FC = () => {

  /** Поиск подписок. */
  const [search, setSearch] = useState('');

  const { users, isLoading } = useUsersState({ page: 1, count: 100, search, onlySubscriptions: true });

  return (
    <div className={`${classes['user-subscribe']}`}>
      <Input value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={'Поиск'}/>
      <div className={`${classes['user-subscribe__users']} ${users && users.length > 0 ? classes.filled : ''}`}>
        {isLoading ?
          <Spin/> :
          users && users.length > 0 ?
            users.map((user, i) => <UserCard {...user}
              isSubscribe={true}
              classes={{ container: classes['user-subscribe__users_item'] }}
              key={i}/>) :
            <EmptyResult/>}
      </div>
    </div>
  );
};

export const UserSubscribePage = memo(UserSubscribePageComponent);
