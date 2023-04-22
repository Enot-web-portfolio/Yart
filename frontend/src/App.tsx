import { Suspense, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import { RootRouter } from './routes/RootRouter';
import { muiTheme } from './theme/muiTheme';

import './theme';
import { Spin } from 'antd';

export const App: FC = () => (
  <ThemeProvider theme={muiTheme}>
    <BrowserRouter>
      <Suspense fallback={<Spin/>}>
        <RootRouter/>
      </Suspense>
    </BrowserRouter>
  </ThemeProvider>
);
