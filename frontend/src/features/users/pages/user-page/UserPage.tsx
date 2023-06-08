import React, { FC, memo } from 'react';

import { ToastContainer } from 'react-toastify';

import { Spin, Tabs, Typography } from 'antd';

import { Route, Routes, useNavigate } from 'react-router-dom';

import { Outlet } from '@mui/icons-material';

import { toUser, toUserAbout, toUserWorks } from '../../../../routes/route-links';

import { ErrorResult } from '../../../../components/ErrorResult';

import { useCurrentUserStore } from '../../../../core/store/user/store';

import { AuthGuard } from '../../../../routes/guards/AuthGuard';

import classes from './UserPage.module.scss';
import { useUserState } from './useUserState';

const { Title, Text } = Typography;

const UserPageComponent: FC = () => {
  const { user, id, isLoading } = useUserState();
  const currentUserId = useCurrentUserStore(store => store.user ? store.user.userId : null);
  const navigator = useNavigate();

  if (isLoading) {
    return <Spin/>;
  }
  if (user === null) {
    return <ErrorResult/>;
  }
  return (
    <div className={`${classes['user-page']}`}>
      <div className={`${classes['user-page__main']}`}>
        <div className={`${classes['user-page__main__image']}`}>

        </div>
        <div className={`${classes['user-page__main__info']}`}>
          <Title level={2} className={`${classes['user-page__main__name']}`}>{user.userFullName}</Title>
          <Text className={`${classes['user-page__main__info_skills']}`}>
            {user.userSelectedMainSkills.join(', ')}
          </Text>
          <div className={`${classes['user-page__main__info_detailed']}`}>
            {user.userCity &&
              <div className={`${classes['user-page__main__info_detailed__item']}`}>
                <img src="/src/assets/icons/location.svg" alt="user work place"
                  className={`${classes['user-page__main__info_detailed__item_icon']}`}/>
                <Text className={`${classes['user-page__main__info_detailed__item_text']}`}>{user.userCity}</Text>
              </div>}
            {user.userCompany &&
              <div className={`${classes['user-page__main__info_detailed__item']}`}>
                <img src="/src/assets/icons/suitcase.svg" alt="user work place"
                  className={`${classes['user-page__main__info_detailed__item_icon']}`}/>
                <Text className={`${classes['user-page__main__info_detailed__item_text']}`}>{user.userCompany}</Text>
              </div>}
          </div>
          {id !== undefined && currentUserId === +id &&
            <Text>Подписчики: 60</Text>}
        </div>
      </div>

      <Tabs type={'card'}
        onChange={key => navigator(toUser(id ?? '') + key)}
        items={[
          { key: '/works', label: 'Работы' },
          { key: '/about', label: 'О себе' },
        ]}/>

      <Outlet/>
    </div>
  );
};

export const UserPage = memo(UserPageComponent);
