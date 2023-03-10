import { memo, FC, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { AppForm } from 'src/components/AppForm';

import { useAuthStore } from 'src/core/store/auth/store';

import { useAuthActions } from 'src/core/services/hooks/useAuthActions';

import {
  initValues,
  loginFormSchema,
  LoginFormValue,
} from './LoginForm.settings';

const LoginFormComponent: FC = () => {
  const { login } = useAuthActions();
  const isLoadingLogin = useAuthStore(store => store.isLoading);
  const error = useAuthStore(store => store.error);
  const resetLoginData = useAuthStore(store => store.reset);

  const handleUserLogin = (values: LoginFormValue): void => {
    login({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => () => {
    resetLoginData();
  }, [resetLoginData]);

  return (
    <AppForm
      formikConfig={{
        initialValues: initValues,
        validationSchema: loginFormSchema,
        onSubmit: handleUserLogin,
      }}
      error={error}
    >
      <Box component={Form} sx={{ mt: 1 }}>
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          disabled={isLoadingLogin}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </AppForm>
  );
};

export const LoginForm = memo(LoginFormComponent);
