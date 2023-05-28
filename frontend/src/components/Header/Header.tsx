import { FC, memo, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthState } from '../../core/services/hooks/useAuthState';

import classes from './Header.module.scss';

// Компонент Хедер сайта
const HeaderComponent: FC = () => {
  const { openAuthModal, isUserAuthorized } = useAuthState();

  return (
    <header className={`${classes.header}`} id={'header'}>
      <img src="/src/assets/logo.svg" alt="Yart - portfolio" className={`${classes.header__logo}`}/>
      <nav className={`${classes.navbar}`}>
        <NavLink to={'/work/editor'} className={`${classes.navbar__group} ${classes.navbar__element}`}>
          <img src="/src/assets/icons/plus.svg" alt="add work" className={`${classes['header__work-btn']}`}/>
        </NavLink>
        <div className={`${classes.navbar__group}`}>
          <NavLink to={'/about'} className={`${classes.navbar__link}`}>О нас</NavLink>
          <NavLink to={'/works'} className={`${classes.navbar__link}`}>Работы</NavLink>
          <NavLink to={'/people'} className={`${classes.navbar__link}`}>Люди</NavLink>
        </div>
        <div className={`${classes.navbar__group} ${classes.navbar__element}`}
          onClick={() => {
               if (isUserAuthorized) {
                 return;
               }
               openAuthModal();
             }}>
          <img src="/src/assets/icons/user.svg" alt="add work" className={`${classes['header__work-btn']}`}/>
        </div>
      </nav>
    </header>
  );
};

// Компонент Хедер сайта
export const Header = memo(HeaderComponent);
