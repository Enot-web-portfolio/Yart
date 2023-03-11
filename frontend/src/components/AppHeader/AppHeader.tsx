import { memo, FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Box, Button, Link, Toolbar,
} from '@mui/material';
import { useCurrentUserStore } from 'src/core/store/user/store';
import { useAuthActions } from 'src/core/services/hooks/useAuthActions';

const AppHeaderComponent: FC = () => {
  const { logout } = useAuthActions();
  const user = useCurrentUserStore(store => store.user);




  const handleUserLogout = () => {
    logout();
  };

  const rightSection = user ? (
    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
      <span>
        Hello,
        {' '}
        <b>{user.name}</b>
      </span>
      <Button
        color="inherit"
        onClick={handleUserLogout}
        sx={{ mx: 1 }}
      >
        Logout
      </Button>
    </Box>
  ) : (
    <Button
      component={RouterLink}
      color="inherit"
      variant="outlined"
      to="login"
    >
      Login
    </Button>
  );

  return (
    <AppBar position="relative">
      <Toolbar>
        {/* Read more about routing in MUI here: https://mui.com/guides/routing/ */}
        <Link
          component={RouterLink}
          to="/"
          variant="h5"
          color="inherit"
          underline="none"
          noWrap
        >
          React Boilerplate
        </Link>
        <div />
        <Box sx={{ flexGrow: 1 }} />
        {rightSection}
      </Toolbar>
    </AppBar>
  );
};

export const AppHeader = memo(AppHeaderComponent);
