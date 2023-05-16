import React, {Dispatch, FC, useState} from 'react';
import classes from './AuthModal.module.scss';
import {Typography} from "antd";
import {AuthType} from "./types";
import {SignInForm} from "./SignInForm";
import {SignUpForm} from "./SignUpForm";
import {typedMemo} from "../../core/utils/typed-memo";
import {SetState} from "zustand";

const {Link, Text} = Typography;

type Props = Readonly<{
  isOpen: boolean;
  setIsOpen: Dispatch<SetState<boolean>>;
}>

const AuthModalComponent: FC<Props> = (props) => {
  const [authType, setAuthType] = useState(AuthType.SignIn);

  const toggleAuthType = () => {
    setAuthType(curAuthType =>
      curAuthType === AuthType.SignUp ? AuthType.SignIn : AuthType.SignUp);
  }

  return (
    <div className={`${classes['auth-modal']}`}>
      <div className={`${classes['auth-modal__close']}`}>
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
  )
}

export const AuthModal = typedMemo(AuthModalComponent);
