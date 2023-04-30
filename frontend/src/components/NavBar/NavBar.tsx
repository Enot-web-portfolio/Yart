import { FC, memo } from 'react';

import classes from './NavBar.module.css';

// TODO: Добавить ссылки на страницы

const NavBarComponent: FC = () => <nav className={`${classes['navbar-panel']}`}>
  <a className={`${classes['navbar-panel__link']}`}>О нас</a>
  <a className={`${classes['navbar-panel__link']}`}>Работы</a>
  <a className={`${classes['navbar-panel__link']}`}>Люди</a>
</nav>;

export const NavBar = memo(NavBarComponent);
