import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';

import { useModalActivityState } from '../../core/services/hooks/useModalActivityState';

import { typedMemo } from '../../core/utils/typed-memo';

import classes from './Modal.module.scss';

type Props = Readonly<{

  /** Ф-ция для отрисовки внутреннего содержимого окна. */
  component(setIsActive: (active: boolean) => void, isActive: boolean): JSX.Element;

  /** Класс окна. */
  modalClassName?: string;

  /** Активно ли окно (из вне). */
  isOutsideActive?: boolean;

  /** Ф-ция закрытия окна (из вне). */
  setIsOutsideActive?: (active: boolean) => void;

  /** Не закрывает ли окно по мисс клику. */
  isNotClickAway?: boolean;
}>;

/**
 * Компонент Модальное окно.
 * @param props
 */
const ModalComponent: FC<Props> = props => {

  /** Ссылка на модальное окно. */
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { isActive, setIsActive } = useModalActivityState([modalRef.current], undefined, undefined, props.isNotClickAway);

  useEffect(() => {
    props.isOutsideActive !== undefined && setIsActive(props.isOutsideActive);
  }, [props.isOutsideActive]);

  useEffect(() => {
    props.setIsOutsideActive?.(isActive);
  }, [isActive]);

  return (
    <div className={`${classes.modal__wrapper} ${isActive ? classes.modal_active : ''}`}>
      <div className={`${classes.modal} ${props.modalClassName}`} ref={modalRef}>
        {props.component(setIsActive, isActive)}
      </div>
    </div>
  );
};

export const Modal = typedMemo(ModalComponent);
