import * as Yup from 'yup';

import { SignUp } from '../../core/models/signup-data';
import { Login } from '../../core/models/login-data';
export const initialSignInState: Login = {
  email: '',
  password: '',
};

export const initialSignUpState: SignUp = {
  email: '',
  password: '',
  repeatedPassword: '',
  firstName: '',
  lastName: '',
};

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required('Введи почту')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный адрес'),
  password: Yup.string()
    .required('Введи пароль из 8 и более символов')
    .min(8, 'Введи пароль из 8 и более символов'),
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .required('Введи почту')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный адрес'),
  password: Yup.string()
    .required('Введи пароль из 8 и более символов')
    .min(8, 'Введи пароль из 8 и более символов'),
  firstName: Yup.string()
    .required('Введи имя'),
  lastName: Yup.string()
    .required('Введи фамилию'),
  repeatedPassword: Yup.string()
    .required('Повторите пароль'),
});
