import React, {FC, memo} from 'react';

import {ToastContainer} from 'react-toastify';

import {Spin, Tabs, Typography} from 'antd';

import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';

import {Outlet} from '@mui/icons-material';

import {toUser, toUserAbout, toUserWorks} from '../../../../routes/route-links';

import {ErrorResult} from '../../../../components/ErrorResult';

import {useCurrentUserStore} from '../../../../core/store/user/store';

import {AuthGuard} from '../../../../routes/guards/AuthGuard';

import classes from './UserPage.module.scss';
import {useUserState} from './useUserState';
import {UserWorksPage} from './detailed/user-works-page';
import {UserSettingsPage} from './detailed/user-settings-page';
import {UserSubscribePage} from './detailed/user-subscribe-page';
import {UserAboutPage} from './detailed/user-about-page';
import {currentUserNavOptions, userNavOptions} from "./nav-options";

const {Title, Text} = Typography;

const UserPageComponent: FC = () => {
  const {user, id, isLoading} = useUserState();
  const currentUserId = useCurrentUserStore(store => store.user ? store.user.userId : null);
  const navigator = useNavigate();

  if (isLoading) {
    return <Spin/>;
  }
  if (user === null) {
    return <ErrorResult/>;
  }

  const isCurrentUser = id !== undefined && currentUserId === +id;
  return (
    <div className={`${classes['user-page']}`}>
      <div className={`${classes['user-page__main']}`}>
        <div className={`${classes['user-page__main__image']}`}>

        </div>
        <div className={`${classes['user-page__main__info']}`}>
          <Text className={`${classes['user-page__main__name']}`}>{user.userFullName}</Text>
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
          {isCurrentUser &&
            <Text>Подписчики: {user.userSubscribersCount}</Text>}
        </div>
      </div>

      <Tabs type={'card'}
            onChange={key => navigator(toUser(id ?? '') + key)}
            items={isCurrentUser ? currentUserNavOptions : userNavOptions}/>
      <Routes>
        <Route path={''} element={<Navigate to={toUserWorks(id ?? '')}/>}/>
        <Route path={'works'} element={<UserWorksPage/>}/>
        <Route path={'about'} element={<UserAboutPage/>}/>
        <Route path={'settings'} element={<UserSettingsPage/>}/>
        <Route path={'subscribe'} element={<UserSubscribePage/>}/>
      </Routes>
    </div>
  );
};

export const UserPage = memo(UserPageComponent);
