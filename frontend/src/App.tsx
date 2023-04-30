import { Suspense, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spin, ConfigProvider } from 'antd';

import { RootRouter } from './routes/RootRouter';

export const App: FC = () => (
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          fontSize: 25,
        },
      }}>
      <Suspense fallback={<Spin/>}>
        <RootRouter/>
      </Suspense>
    </ConfigProvider>
  </BrowserRouter>
);
