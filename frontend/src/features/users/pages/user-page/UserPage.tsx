import React, { FC, memo } from 'react';

import { Spin, Typography, Button } from 'antd';

import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import { toUserAbout, toUserSettings, toUserSubscribe, toUserWorks, toWorkEditor } from '../../../../routes/route-links';

import { ErrorResult } from '../../../../components/ErrorResult';

import { useCurrentUserStore } from '../../../../core/store/user/store';

import classes from './UserPage.module.scss';
import { useUserState } from './useUserState';
import { UserWorksPage } from './detailed/user-works-page';
import { UserSettingsPage } from './detailed/user-settings-page';
import { UserSubscribePage } from './detailed/user-subscribe-page';
import { UserAboutPage } from './detailed/user-about-page';

const { Text } = Typography;

/** Страница Пользователь. */
const UserPageComponent: FC = () => {
  const { user, id, isLoading, onUserGet } = useUserState();

  /** Id авторизованного пользователя. */
  const currentUserId = useCurrentUserStore(store => store.user ? store.user.userId : null);

  if (isLoading) {
    return <Spin/>;
  }
  if (user === null) {
    return <ErrorResult/>;
  }

  /** Является ли данный пользователем текущим авторизованным. */
  const isCurrentUser = id !== undefined && currentUserId === +id;

  return (
    <div className={`${classes['user-page']}`}>
      <div className={`${classes['user-page__main']}`}>
        <div className={`${classes['user-page__main__image']}`}
          style={{ backgroundImage: `url('${user.userImageUrl}')` }}/>
        <div className={`${classes['user-page__main__info']}`}>
          <Text className={`${classes['user-page__main__name']}`}>{user.userFullName}</Text>
          {user.userSelectedMainSkills.length > 0 &&
              <Text className={`${classes['user-page__main__info_skills']}`}>
                {user.userSelectedMainSkills.join(', ')}
              </Text>}
          {(user.userCity || user.userCompany) &&
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
                    <Text
                      className={`${classes['user-page__main__info_detailed__item_text']}`}>{user.userCompany}</Text>
                  </div>}
              </div>}
          {isCurrentUser &&
              <Text>Подписчики: {user.userSubscribersCount}</Text>}
        </div>
      </div>
      {isCurrentUser && <NavLink to={toWorkEditor()}>
        <Button type={'primary'}>Создать работу</Button>
      </NavLink>}

      <div className={`${classes['user-page__nav']}`}>
        <NavLink to={toUserWorks(id ?? '')}
          className={({ isActive }) => `${classes['user-page__nav_item']} ${isActive ? classes.active : ''}`}>
            Работы
        </NavLink>
        <NavLink to={toUserAbout(id ?? '')}
          className={({ isActive }) => `${classes['user-page__nav_item']} ${isActive ? classes.active : ''}`}>
            О себе
        </NavLink>
        {isCurrentUser &&
            <NavLink to={toUserSubscribe(id ?? '')}
              className={({ isActive }) => `${classes['user-page__nav_item']} ${isActive ? classes.active : ''}`}>
              Подписки
            </NavLink>}
        {isCurrentUser &&
            <NavLink to={toUserSettings(id ?? '')}
              className={({ isActive }) => `${classes['user-page__nav_item']} ${isActive ? classes.active : ''}`}>
              Настройки
            </NavLink>}
      </div>

      <Routes>
        <Route path={''} element={<Navigate to={toUserWorks(id ?? '')}/>}/>
        <Route path={'works'} element={<UserWorksPage/>}/>
        <Route path={'about'} element={<UserAboutPage user={user}/>}/>
        <Route path={'settings'}
          element={isCurrentUser ? <UserSettingsPage updateUser={onUserGet}/> : <Navigate to={toUserWorks(id ?? '')}/>}/>
        <Route path={'subscribe'}
          element={isCurrentUser ? <UserSubscribePage/> : <Navigate to={toUserWorks(id ?? '')}/>}/>
      </Routes>
    </div>
  );
};

export const UserPage = memo(UserPageComponent);
