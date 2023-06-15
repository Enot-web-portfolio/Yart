import React, { FC, useState, useEffect } from 'react';

import { Typography } from 'antd';

import { typedMemo } from '../../core/utils/typed-memo';

import { useAuthState } from '../../core/services/hooks/useAuthState';

import classes from './AuthModal.module.scss';
import { AuthType } from './types';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

const { Link, Text } = Typography;

type Props = Readonly<{

  /** Ф-ция закрытия/открытия окна авторизации. */
  setIsActive(active: boolean): void;

  /** Открыто ли окно авторизации. */
  isActive: boolean;
}>;

/**
 * Компонент Окно авторизации.
 * @param props
 */
const AuthModalComponent: FC<Props> = props => {

  const { isOpenAuth, closeAuthModal, isUserAuthorized } = useAuthState();

  /** Тип авторизации. */
  const [authType, setAuthType] = useState(AuthType.SignIn);

  useEffect(() => {
    props.setIsActive(isOpenAuth);
  }, [isOpenAuth]);

  useEffect(() => {
    if (!props.isActive) {
      closeAuthModal();
    }
  }, [props.isActive]);

  useEffect(() => {
    isUserAuthorized && props.setIsActive(false);
  }, [isUserAuthorized]);

  /** Ф-ция изменения типа авторизации. */
  const toggleAuthType = () => {
    setAuthType(curAuthType =>
      curAuthType === AuthType.SignUp ? AuthType.SignIn : AuthType.SignUp);
  };

  return (
    <>
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
    </>
  );
};

export const AuthModal = typedMemo(AuthModalComponent);
