import React, { FC, useEffect, useRef, useState } from 'react';

import { Button, Typography } from 'antd';

import { InputWithError } from '../../../../../../../components/InputWithError';
import { useModalActivityState } from '../../../../../../../core/services/hooks/useModalActivityState';

import { typedMemo } from '../../../../../../../core/utils/typed-memo';

import { UsersService } from '../../../../../../../core/services/users-service';

import classes from './EmailEditor.module.scss';

const { Text, Link } = Typography;

type Props = Readonly<{

  /** Значение почты.*/
  value: string;

  /** Ф-ция сохранения почты. */
  setValue: (value: string) => void;

  /** Класс редактора почты. */
  className: string;

  /** Активирована ли почта. */
  isActive: boolean;
}>;

/**
 * Компонент Редактор почты Пользователя.
 * @param props
 */
const EmailEditorComponent: FC<Props> = props => {

  /** Ссылка на модальное окно редактра почты. */
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { isActive, setIsActive } = useModalActivityState([modalRef.current]);

  /** Текущее значение почты в редакторе. */
  const [email, setEmail] = useState(props.value);

  /** Ошибка при написании почты. */
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    !isActive && reset();
  }, [isActive]);

  /**
   * Ф-ция изменения почты.
   * @param value - Значение почты.
   */
  const change = (value: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setError(emailRegex.test(value) ? undefined : 'Введи корректную почту');
    setEmail(value);
  };

  /** Ф-ция подтверждения изменения почты. */
  const submit = () => {
    props.setValue(email.trim());
    setIsActive(false);
  };

  /** Ф-ция очистки редактора. */
  const reset = () => {
    setError(undefined);
    setEmail(props.value);
  };

  return (
    <div className={`${classes['email-editor']} ${props.className}`}>
      <div className={`${classes['email-editor__info']}`}>
        <Text className={`${classes['email-editor__info_label']}`}>Почта:</Text>
        <Text className={`${classes['email-editor__info_value']}`}>{props.value}</Text>
        {!props.isActive &&
          <Link className={`${classes['email-editor__info_activate']}`}
            onClick={() => UsersService.postActivationResend(props.value)}>
            Подтвердить
          </Link>}
        <Link className={`${classes['email-editor__info_change']}`}
          onClick={() => setIsActive(true)}>
          Изменить
        </Link>
      </div>
      <div className={`${classes['email-editor__modal_wrapper']} ${isActive ? classes.active : ''}`}>
        <div className={`${classes['email-editor__modal']}`} ref={modalRef}>
          <div className={`${classes['email-editor__modal_close']}`} onClick={() => setIsActive(false)}>
            <img src="/src/assets/icons/plus.svg" alt="close email modal"/>
          </div>
          <Text className={`${classes['email-editor__modal_desc']}`}>
            Не забудь подтвердить почту! После изменения на новую почту придет письмо
          </Text>
          <InputWithError value={email} setValue={value => change(value as string)} error={error}/>
          <div className={`${classes['email-editor__modal_buttons']}`}>
            <Button type={'primary'} onClick={submit} disabled={error !== undefined}>Продолжить</Button>
            <Button type={'default'} onClick={() => setIsActive(false)}>Отмена</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmailEditor = typedMemo(EmailEditorComponent);
