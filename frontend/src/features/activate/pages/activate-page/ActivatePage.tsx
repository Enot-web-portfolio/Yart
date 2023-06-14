import React, { FC, memo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Typography, Spin } from 'antd';

import { ActivateService } from '../../../../core/services/activate-service';
import { toWorks } from '../../../../routes/route-links';

import classes from './ActivatePage.module.scss';

const { Text } = Typography;

const ActivatePageComponent: FC = () => {
  const { uid, token } = useParams<{ uid: string; token: string; }>();
  const navigate = useNavigate();

  useEffect(() => {
    activate();
  }, [uid, token]);

  /** Activate mail. */
  async function activate() {
    if (uid === undefined || token === undefined) {
      return;
    }
    try {
      await ActivateService.postActivate(uid, token);

      navigate(toWorks());
      setTimeout(() => toast.success('Почта подтверждена'), 1000);
    } catch (error: unknown) {
      navigate(toWorks());
      setTimeout(() => toast.error('Почта не подтверждена'), 1000);
    }
  }

  return (
    <div className={`${classes['activate-page']}`}>
      <div className={`${classes['activate-page__block']}`}>
        <Text>Подтверждение почты</Text>
        <Spin/>
      </div>
    </div>
  );
};

export const ActivatePage = memo(ActivatePageComponent);
