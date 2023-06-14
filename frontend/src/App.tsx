import React, { Suspense, FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spin, ConfigProvider } from 'antd';

import { ToastContainer } from 'react-toastify';

import { RootRouter } from './routes/RootRouter';
import { Header } from './components/Header';
import 'react-toastify/scss/main.scss';
import { AuthModal } from './components/AuthModal';

export const App: FC = () => (
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {
          fontSize: 25,
          fontFamily: 'Montserrat, sans-serif',
        },
      }}>
      <Suspense fallback={<Spin/>}>
        <Header/>
        <div className="content">
          <RootRouter/>
        </div>
        <AuthModal/>
        <ToastContainer/>
      </Suspense>
    </ConfigProvider>
  </BrowserRouter>
);
