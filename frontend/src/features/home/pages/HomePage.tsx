import { memo, FC } from 'react';
import { Box } from '@mui/material';

import styles from './HomePage.module.css';

const HomePageComponent: FC = () => (
  <Box className={styles.homePageContainer}>
    <h1>Home page</h1>
  </Box>
);

export const HomePage = memo(HomePageComponent);
