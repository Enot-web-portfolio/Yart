import {SignUp} from "../../core/models/signup-data";
import {Login} from "../../core/models/login-data";
import * as Yup from 'yup';
export const initialSignInState: Login = {
  email: '',
  password: '',
}

export const initialSignUpState: SignUp = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
}

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .required('Введи почту')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный адрес'),
  password: Yup.string()
    .required('Введи пароль из 5 и более символов')
    .min(5, 'Введи пароль из 5 и более символов'),
});

export const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .required('Введи почту')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный адрес'),
  password: Yup.string()
    .required('Введи пароль из 5 и более символов')
    .min(5, 'Введи пароль из 5 и более символов'),
  firstName: Yup.string()
    .required('Введи имя'),
  lastName: Yup.string()
    .required('Введи фамилию')
});
