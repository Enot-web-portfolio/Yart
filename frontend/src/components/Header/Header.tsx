import { FC, memo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { Button, Typography } from 'antd';

import { useAuthState } from '../../core/services/hooks/useAuthState';

import { useCurrentUserStore } from '../../core/store/user/store';
import { toAbout, toWorks, toUsers, toWorkEditor, toUserWorks } from '../../routes/route-links';

import classes from './Header.module.scss';

const { Text } = Typography;

// Компонент Хедер сайта
const HeaderComponent: FC = () => {
  const { openAuthModal, isUserAuthorized, authBySecret, logout } = useAuthState();
  const user = useCurrentUserStore(store => store.user);

  useEffect(() => {
    authBySecret();
  }, []);

  return (
    <header className={`${classes.header}`} id={'header'}>
      <img src="/src/assets/logo.svg" alt="Yart - portfolio" className={`${classes.header__logo}`}/>
      <nav className={`${classes.navbar}`}>
        <NavLink to={toWorkEditor()} className={`${classes.navbar__group} ${classes.navbar__element}`}>
          <img src="/src/assets/icons/plus.svg" alt="add work" className={`${classes['header__work-btn']}`}/>
        </NavLink>
        <div className={`${classes.navbar__group}`}>
          <NavLink to={toAbout()} className={`${classes.navbar__link}`}>О нас</NavLink>
          <NavLink to={toWorks()} className={`${classes.navbar__link}`}>Работы</NavLink>
          <NavLink to={toUsers()} className={`${classes.navbar__link}`}>Люди</NavLink>
        </div>
        <div className={`${classes.navbar__group} ${classes.navbar__element} ${classes.navbar__user}`}
          onClick={() => {
               if (isUserAuthorized) {
                 return;
               }
               openAuthModal();
             }}>
          <img src={'/src/assets/icons/user.svg'} alt="add work" className={`${classes['header__work-btn']}`}/>
          {user !== null &&
            <div className={`${classes.navbar__user_panel}`}>
              <div className={`${classes.navbar__user_info}`}>
                <Text className={`${classes.navbar__user_info__name}`}>{user.userFullName}</Text>
                <NavLink to={toUserWorks(user.userId)}>
                  <Button type={'link'} className={`${classes.navbar__user_info__btn}`}>Профиль</Button>
                </NavLink>
                <Button type={'link'} onClick={logout} className={`${classes.navbar__user_info__btn} ${classes.navbar__user_info__btn_logout}`}>Выйти</Button>
              </div>
              <img src={user.userImageUrl ?? '/src/assets/icons/user.svg'} alt="add work"
                className={`${classes.navbar__user_info__img}`}/>
            </div>}
        </div>
      </nav>
    </header>
  );
};

// Компонент Хедер сайта
export const Header = memo(HeaderComponent);
