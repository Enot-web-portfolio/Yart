import React, { FC, memo } from 'react';
import { Form, Formik, ErrorMessage } from 'formik';
import { Typography, Button, Input } from 'antd';

import { useAuthState } from '../../core/services/hooks/useAuthState';

import classes from './AuthModal.module.scss';
import { initialSignInState, SignInSchema } from './config';

const { Text } = Typography;

const SignInFormComponent: FC = () => {
  const { login, isLoading } = useAuthState();

  return (
    <Formik initialValues={initialSignInState}
      validationSchema={SignInSchema}
      validateOnBlur
      onSubmit={login}>{
        ({ setFieldValue, values }) => (
          <Form className={`${classes['auth-modal__form']}`}>
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
                onChange={event => setFieldValue('password', event.target.value)}/>
              <Text type={'warning'} className={`${classes['auth-modal__form_field__error']}`}>
                <ErrorMessage name={'password'}/>
              </Text>
            </div>
            <Button type={'primary'} htmlType={'submit'} loading={isLoading} disabled={isLoading}>За работу</Button>
          </Form>
        )}
    </Formik>);
};

export const SignInForm = memo(SignInFormComponent);
