import React, {FC, memo, useState} from 'react';
import {Form, Formik, ErrorMessage} from "formik";
import * as Yup from 'yup';
import {initialSignInState} from "./config";
import {Login} from "../../core/models/login-data";
import classes from './AuthModal.module.scss';
import {Button, Input} from "antd";

const SignUpFormComponent: FC = () => {
  const submit = (data: Login) => {

  }

  return (
    <Formik initialValues={initialSignInState}
            validationSchema={{
              email: Yup.string()
                .required('Введите почту')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный адрес'),
              password: Yup.string()
                .required('Введите пароль')
            }}
            validateOnBlur
            onSubmit={submit}>{
      ({setFieldValue, errors, values}) => (
        <Form>
          <div className={`${classes['auth-modal__form_field']}`}>
            <Input value={values.email} onChange={(value) => setFieldValue('email', value)}/>
            <ErrorMessage name={'email'}/>
          </div>
          <div className={`${classes['auth-modal__form_field']}`}>
            <Input value={values.password} onChange={(value) => setFieldValue('password', value)}/>
            <ErrorMessage name={'password'}/>
          </div>
          <Button type={'primary'}>За работу</Button>
        </Form>
      )
    }
    </Formik>)
}

export const SignUpForm = memo(SignUpFormComponent);
