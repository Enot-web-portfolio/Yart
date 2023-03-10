import { memo, FC } from 'react';
import {
  Avatar, Box, Container, Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

import { LoginForm } from '../../components/LoginForm';

// Template from MUI docs: https://mui.com/getting-started/templates/
const LoginPageComponent: FC = () => (
  <Container maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <LoginForm />
    </Box>
  </Container>
);

export const LoginPage = memo(LoginPageComponent);
