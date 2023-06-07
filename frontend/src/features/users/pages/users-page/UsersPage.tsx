import React, { FC, memo, useState } from 'react';

import { Input, Typography, Spin } from 'antd';

import { ToastContainer } from 'react-toastify';

import { SkillsSelect } from '../../../../components/SkillsSelect';

import { useUsersState } from '../../../../core/services/hooks/useUsersState';

import { ErrorResult } from '../../../../components/ErrorResult';

import { UserCard } from '../../../../components/UserCard';

import classes from './UsersPage.module.scss';

const { Title } = Typography;

const UsersPageComponent: FC = () => {

  /** Выбранные категории.*/
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const { users, isLoading } = useUsersState(selectedSkills);

  const [search, setSearch] = useState('');

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
            <div className={`${classes['users-page__users']}`}>
              {users.map((user, i) =>
                <UserCard {...user} key={i}
                  classes={{ container: classes['users-page__user-card'] }}/>)}
            </div>}
      </div>
      <ToastContainer/>
    </div>
  );
};

export const UsersPage = memo(UsersPageComponent);
