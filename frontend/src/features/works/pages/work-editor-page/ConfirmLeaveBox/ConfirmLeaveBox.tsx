import React, { FC } from 'react';

import { Button, Typography } from 'antd';

import { useNavigate } from 'react-router-dom';

import { Modal } from '../../../../../components/Modal';

import { typedMemo } from '../../../../../core/utils/typed-memo';

import classes from './ConfirmLeaveBox.module.scss';

const { Text, Title } = Typography;

type Props = Readonly<{

  /** Открыто ли окно выхода из редактора. */
  isActive: boolean;

  /** Ф-ция закрытия/открытия окна выхода. */
  setActive(active: boolean): void;
}>;

/**
 * Компонент Окно выхода из редактора.
 * @param props
 */
const ConfirmLeaveBoxComponent: FC<Props> = props => {

  /** Обьект для навигации. */
  const navigate = useNavigate();

  return (
    <Modal isOutsideActive={props.isActive}
      setIsOutsideActive={props.setActive}
      modalClassName={`${classes['confirm-leave-box']}`}
      component={
             setIsActive => (
          <>
            <Title level={3} className={`${classes['confirm-leave-box__title']}`}>Несохраненные изменения</Title>
            <Text>Ты потеряешь все несохраненные изменения при выходе с этой страницы. Ты уверен, что хочешь
                   покинуть
                   страницу?</Text>
            <div className={`${classes['confirm-leave-box__buttons']}`}>
              <Button type={'default'} onClick={() => setIsActive(false)}>Отмена</Button>
              <Button type={'primary'} onClick={() => navigate(-1)}>Покинуть</Button>
            </div>
          </>
        )
      }/>
  );
};

export const ConfirmLeaveBox = typedMemo(ConfirmLeaveBoxComponent);
