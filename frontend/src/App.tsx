import { Suspense, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spin, ConfigProvider } from 'antd';

import { RootRouter } from './routes/RootRouter';
import { Header } from './components/Header';

export const App: FC = () => (
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          fontSize: 25,
        },
      }}>
      <Suspense fallback={<Spin/>}>
        <Header/>
        <div className="content">
          <RootRouter/>
        </div>
      </Suspense>
    </ConfigProvider>
  </BrowserRouter>
);
