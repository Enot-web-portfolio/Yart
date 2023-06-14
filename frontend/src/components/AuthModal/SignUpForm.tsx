import React, { FC, memo, useState } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';

import { Button, Input, Typography } from 'antd';

import { useAuthState } from '../../core/services/hooks/useAuthState';

import { initialSignUpState, SignUpSchema } from './config';
import classes from './AuthModal.module.scss';

const { Text } = Typography;

const SignUpFormComponent: FC = () => {
  const [repeatedPasswordError, setRepeatedPassword] = useState<string | null>(null);
  const { signUp, isLoading } = useAuthState();

  return (
    <Formik initialValues={initialSignUpState}
      validationSchema={SignUpSchema}
      validateOnBlur
      onSubmit={signUp}>{
        ({ setFieldValue, errors, values }) => (
          <Form className={`${classes['auth-modal__form']}`}>
            <div className={`${classes['auth-modal__form_field']} ${classes['auth-modal__form_field__name']}`}>
              <div>
                <Input value={values.firstName}
                  placeholder={'Имя'}
                  onChange={event => setFieldValue('firstName', event.target.value)}/>
                <Text type={'warning'} className={`${classes['auth-modal__form_field__error']}`}>
                  <ErrorMessage name={'firstName'}/>
                </Text>
              </div>
              <div>
                <Input value={values.lastName}
                  placeholder={'Фамилия'}
                  onChange={event => setFieldValue('lastName', event.target.value)}/>
                <Text type={'warning'} className={`${classes['auth-modal__form_field__error']}`}>
                  <ErrorMessage name={'lastName'}/>
                </Text>
              </div>
            </div>
            <div className={`${classes['auth-modal__form_field']}`}>
              <Input value={values.email}
                prefix={'Почта:'}
                onChange={event => setFieldValue('email', event.target.value)}/>
              <Text type={'warning'} className={`${classes['auth-modal__form_field__error']}`}>
                <ErrorMessage name={'email'}/>
              </Text>
            </div>
            <div className={`${classes['auth-modal__form_field']}`}>
              <Input value={values.password}
                prefix={'Пароль:'}
                type={'password'}
                onChange={event => {
                     setFieldValue('password', event.target.value);
                     if (event.target.value === values.repeatedPassword) {
                       setRepeatedPassword(null);
                     } else {
                       setRepeatedPassword('Пароли не совпадают!');
                     }
                   }}/>
              <Text type={'warning'} className={`${classes['auth-modal__form_field__error']}`}>
                <ErrorMessage name={'password'}/>
              </Text>
            </div>
            <div className={`${classes['auth-modal__form_field']}`}>
              <Input value={values.repeatedPassword}
                prefix={'Пароль х2:'}
                type={'password'}
                onChange={event => {
                     setFieldValue('repeatedPassword', event.target.value);
                     if (event.target.value === values.password) {
                       setRepeatedPassword(null);
                     } else {
                       setRepeatedPassword('Пароли не совпадают!');
                     }
                   }}/>
              <Text type={'warning'} className={`${classes['auth-modal__form_field__error']}`}>
                {errors.repeatedPassword ?? repeatedPasswordError}
              </Text>
            </div>
            <Button type={'primary'} htmlType={'submit'} loading={isLoading} disabled={isLoading}>За работу</Button>
          </Form>
        )
      }
    </Formik>);
};

export const SignUpForm = memo(SignUpFormComponent);
