import React, {FC, memo, useEffect, useState} from 'react';

import classes from './UserSubscribePage.module.scss';
import {useParams} from "react-router-dom";
import {useUsersState} from "../../../../../../core/services/hooks/useUsersState";
import {Input, Spin} from "antd";
import {UserCard} from "../../../../../../components/UserCard";
import {EmptyResult} from "../../../../../../components/EmptyResult";


// TODO добавить в getUsers userId
const UserSubscribePageComponent: FC = () => {
  const {id} = useParams<{ id: string }>();
  const [search, setSearch] = useState('');
  const {users, isLoading} = useUsersState({page: 1, count: 100, userId: id, search, onlySubscriptions: true});

  return (
    <div className={`${classes['user-subscribe']}`}>
      <Input value={search}
             onChange={e => setSearch(e.target.value)}
             placeholder={'Поиск'}/>
      <div className={`${classes['user-subscribe__users']} ${users && users.length > 0 ? classes['filled'] : ''}`}>
        {isLoading ?
          <Spin/> :
          users && users.length > 0 ?
            users.map((user, i) => <UserCard {...user}
                                             isSubscribe={true}
                                             classes={{
                                               container: classes['user-subscribe__users_item'],
                                             }}
                                             key={i}/>) :
            <EmptyResult/>}
      </div>
    </div>
  )
};

export const UserSubscribePage = memo(UserSubscribePageComponent);
