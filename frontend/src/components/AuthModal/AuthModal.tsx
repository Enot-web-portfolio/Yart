import React, { FC, useState, useRef, useEffect } from 'react';

import { Typography } from 'antd';

import { typedMemo } from '../../core/utils/typed-memo';

import { useAuthState } from '../../core/services/hooks/useAuthState';

import { useModalActivityState } from '../../core/services/hooks/useModalActivityState';

import classes from './AuthModal.module.scss';
import { AuthType } from './types';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

const { Link, Text } = Typography;

const AuthModalComponent: FC = () => {
  const { isOpenAuth, closeAuthModal, isUserAuthorized } = useAuthState();
  const [authType, setAuthType] = useState(AuthType.SignIn);
  const authModalRef = useRef<HTMLDivElement>(null);
  const { setIsActive } = useModalActivityState([authModalRef.current], closeAuthModal);

  useEffect(() => {
     setIsActive(isOpenAuth);
  }, [isOpenAuth]);

  useEffect(() => {
    isUserAuthorized && setIsActive(false);
  }, [isUserAuthorized]);

  const toggleAuthType = () => {
    setAuthType(curAuthType =>
      curAuthType === AuthType.SignUp ? AuthType.SignIn : AuthType.SignUp);
  };

  return (
    <div className={`${classes['auth-modal__wrapper']} ${isOpenAuth ? classes['auth-modal_active'] : ''}`}>
      <div className={`${classes['auth-modal']}`} ref={authModalRef}>
        <div className={`${classes['auth-modal__close']}`} onClick={closeAuthModal}>
          <img src="/src/assets/icons/plus.svg" alt="close authentificate modal"/>
        </div>
        <Text className={`${classes['auth-modal__header']}`}>
          {authType === AuthType.SignIn ? 'С возвращением!' : 'Добро пожаловать!'}
        </Text>
        {authType === AuthType.SignIn ? <SignInForm/> : <SignUpForm/>}
        <Text className={`${classes['auth-modal__toggle-auth']}`}>
          {authType === AuthType.SignIn ? 'Ты еще не с нами?' : 'Уже творишь с Yart?'}
          <Link className={`${classes.active}`} onClick={toggleAuthType}>
            {authType === AuthType.SignIn ? 'Регистрация' : 'Войти'}
          </Link>
        </Text>
      </div>
    </div>
  );
};

export const AuthModal = typedMemo(AuthModalComponent);
