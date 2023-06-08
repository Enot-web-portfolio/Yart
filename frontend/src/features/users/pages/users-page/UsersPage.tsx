import React, { FC, memo, useEffect, useState } from 'react';

import { Input, Typography, Spin } from 'antd';

import { ToastContainer } from 'react-toastify';

import { SkillsSelect } from '../../../../components/SkillsSelect';

import { useUsersState } from '../../../../core/services/hooks/useUsersState';

import { ErrorResult } from '../../../../components/ErrorResult';

import { UserCard } from '../../../../components/UserCard';

import { EmptyResult } from '../../../../components/EmptyResult';

import classes from './UsersPage.module.scss';

const { Title } = Typography;

const UsersPageComponent: FC = () => {

  /** Выбранные категории.*/
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const { users, isLoading, getUsers } = useUsersState();

  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers(selectedSkills, search);
  }, [selectedSkills, search]);

  return (
    <div className={`${classes['users-page']}`}>
      <div className={`${classes['users-page__search-block']}`}>
        <Title level={2}>Пользователи</Title>
        <Input value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={'Поиск'}/>
      </div>
      <div className={`${classes['users-page__users-block']}`}>
        <SkillsSelect onChange={setSelectedSkills}/>
        {isLoading ?
          <Spin/> :
          users === null ?
            <ErrorResult/> :
            users.length == 0 ?
              <EmptyResult/> :
              <div className={`${classes['users-page__users']}`}>
                {users.map((user, i) =>
                  <UserCard {...user} key={i}
                    classes={{
                              container: classes['users-page__user-card'],
                              action: classes['users-page__user-card__action'],
                    }}/>)}
              </div>}
      </div>
    </div>
  );
};

export const UsersPage = memo(UsersPageComponent);
