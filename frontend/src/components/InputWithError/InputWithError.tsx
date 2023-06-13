import React, { FC } from 'react';

import { Input, Typography } from 'antd';

import { typedMemo } from '../../core/utils/typed-memo';

import classes from './InputWithError.module.scss';

const { Text } = Typography;

type Props = Readonly<{

  /** Текст ошибки. */
  error?: string;

  /** Значение поля ввода. */
  value?: string | number;

  /** Ф-ция изменения значения. */
  setValue?: (value: string | number) => void;

  /** Класс для контейнера поля ввода. */
  containerClassName?: string;

  /** Плейсхолдер. */
  placeholder?: string;

  /** Текст перед вводимым текстом. */
  prefix?: string;
}>;

/**
 * Компонент Поле ввода с ошибкой.
 * @param props - Пропсы компонента.
 */
const InputWithErrorComponent: FC<Props> = props => (
  <div className={`${classes['input-with-error']} ${props.containerClassName || ''}`}>
    <Input value={props.value}
      className={`${classes['input-with-error__input']}`}
      placeholder={props.placeholder}
      prefix={props.prefix}
      onChange={event => props.setValue && props.setValue(event.target.value)}/>
    {props.error &&
      <Text type={'warning'} className={`${classes['input-with-error__error']}`}>
        {props.error}
      </Text>}
  </div>
);

export const InputWithError = typedMemo(InputWithErrorComponent);
