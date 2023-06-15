import React, { Suspense, FC, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spin, ConfigProvider } from 'antd';

import { ToastContainer } from 'react-toastify';

import { RootRouter } from './routes/RootRouter';
import { Header } from './components/Header';
import 'react-toastify/scss/main.scss';
import { AuthModal } from './components/AuthModal';
import { Modal } from './components/Modal';
import { useSkillsStore } from './core/store/skills/store';

export const App: FC = () => {
  const getSkills = useSkillsStore(store => store.getSkills);

  useEffect(() => {
    getSkills();
  }, []);

  return (
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
          <Modal component={(setIsActive, isActive) =>
            <AuthModal setIsActive={setIsActive} isActive={isActive}/>}
          modalClassName={'auth-modal'}/>
          <ToastContainer/>
        </Suspense>
      </ConfigProvider>
    </BrowserRouter>
  );
};
