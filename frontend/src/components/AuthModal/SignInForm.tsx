import React, {FC, memo, useState} from 'react';
import {Form, Formik, ErrorMessage} from "formik";
import {Typography} from "antd";
import {initialSignInState, SignInSchema} from "./config";
import {Login} from "../../core/models/login-data";
import classes from './AuthModal.module.scss';
import {Button, Input} from "antd";
import {AuthService} from "../../core/services/auth-service";
import {useAuthState} from "../../core/services/hooks/useAuthState";

const {Text} = Typography;

const SignInFormComponent: FC = () => {
  const {login, error} = useAuthState();

  console.log(error.response.status)
  return (
    <Formik initialValues={initialSignInState}
            validationSchema={SignInSchema}
            validateOnBlur
            onSubmit={login}>{
      ({setFieldValue, values}) => (
        <Form className={`${classes['auth-modal__form']}`}>
          <div className={`${classes['auth-modal__form_field']}`}>
            <Input value={values.email}
                   prefix={'Почта:'}
                   onChange={(event) => setFieldValue('email', event.target.value)}/>
            <Text type={'warning'} className={`${classes['auth-modal__form_field__error']}`}>
              <ErrorMessage name={'email'}/>
            </Text>
          </div>
          <div className={`${classes['auth-modal__form_field']}`}>
            <Input value={values.password}
                   prefix={'Пароль:'}
                   onChange={(event) => setFieldValue('password', event.target.value)}/>
            <Text type={'warning'} className={`${classes['auth-modal__form_field__error']}`}>
              <ErrorMessage name={'password'}/>
            </Text>
          </div>
          <Button type={'primary'} htmlType={'submit'}>За работу</Button>
        </Form>
      )}
    </Formik>)
}

export const SignInForm = memo(SignInFormComponent);
