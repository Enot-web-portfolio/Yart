import { FC, memo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

// Компонент Хедер сайта
const HeaderComponent: FC = () => {
  useEffect(() => {
    /** Ф-ция фиксации шапки сайта. */
    function onHeaderFixed() {
      const header = document.getElementById('header');
      if (!header) {
        return;
      }

      if (window.scrollY > 0) {
        header.classList.add('header_fixed');
      } else {
        header.classList.remove('header_fixed');
      }
    }

    window.addEventListener('scroll', onHeaderFixed);

    return () => window.removeEventListener('scroll', onHeaderFixed);
  }, []);

  return (<header className={'header'} id={'header'}>
    <img src="/src/assets/logo.svg" alt="Yart - portfolio" className={'header__logo'}/>
    <nav className={'navbar'}>
      <NavLink to={'/work/editor'} className={'navbar__group navbar__element'}>
        <img src="/src/assets/icons/plus.svg" alt="add work" className="header__work-btn"/>
      </NavLink>
      <div className={'navbar__group'}>
        <NavLink to={'/about'} className={'navbar__link'}>О нас</NavLink>
        <NavLink to={'/works'} className={'navbar__link'}>Работы</NavLink>
        <NavLink to={'/people'} className={'navbar__link'}>Люди</NavLink>
      </div>
      <div className={'navbar__group navbar__element'}>
        <img src="/src/assets/icons/user.svg" alt="add work" className="header__work-btn"/>
      </div>
    </nav>
  </header>);
};

// Компонент Хедер сайта
export const Header = memo(HeaderComponent);
