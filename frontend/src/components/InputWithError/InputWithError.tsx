import React, { FC } from 'react';

import { Input, Typography } from 'antd';
import { ErrorMessage } from 'formik';

import { typedMemo } from '../../core/utils/typed-memo';

import classes from './InputWithError.module.scss';

const { Text } = Typography;

type Props = Readonly<{
  error?: string;
  value?: string | number;
  setValue?: (value: string | number) => void;
  containerClassName?: string;
  placeholder?: string;
  prefix?: string;
}>;

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
