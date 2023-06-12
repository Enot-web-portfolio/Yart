import React, { FC, useRef, useState } from 'react';

import { Button, Typography } from 'antd';

import { InputWithError } from '../../../../../../../components/InputWithError';
import { useModalActivityState } from '../../../../../../../core/services/hooks/useModalActivityState';

import { typedMemo } from '../../../../../../../core/utils/typed-memo';

import classes from './EmailEditor.module.scss';

const { Text, Link } = Typography;

type Props = Readonly<{
  value: string;
  setValue: (value: string) => void;
  className: string;
  isActive: boolean;
}>;

const EmailEditorComponent: FC<Props> = props => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { isActive, setIsActive } = useModalActivityState([modalRef.current]);
  const [email, setEmail] = useState(props.value);

  return (
    <div className={`${classes['email-editor']} ${props.className}`}>
      <div className={`${classes['email-editor__info']}`}>
        <Text className={`${classes['email-editor__info_label']}`}>Почта:</Text>
        <Text className={`${classes['email-editor__info_value']}`}>{props.value}</Text>
        {!props.isActive &&
          <Link className={`${classes['email-editor__info_activate']}`}>Подтвердить</Link>}
        <Link className={`${classes['email-editor__info_change']}`} onClick={() => setIsActive(true)}>Изменить</Link>
      </div>
      <div className={`${classes['email-editor__modal_wrapper']} ${isActive ? classes.active : ''}`}>
        <div className={`${classes['email-editor__modal']}`} ref={modalRef}>
          <Text className={`${classes['email-editor__modal_desc']}`}>
            Не забудь подтвердить почту! После изменения на новую почту придет письмо
          </Text>
          <InputWithError value={email} setValue={value => setEmail(value as string)} error={props.error}/>
          <div className={`${classes['email-editor__modal_buttons']}`}>
            <Button type={'primary'} onClick={() => props.setValue(email)}>Продолжить</Button>
            <Button type={'default'} onClick={() => setIsActive(false)}>Отмена</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmailEditor = typedMemo(EmailEditorComponent);
