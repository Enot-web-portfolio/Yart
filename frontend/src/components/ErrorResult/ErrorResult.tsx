import React, {FC} from 'react'
import {Result, ResultProps} from "antd";
import {typedMemo} from "../../core/utils/typed-memo";

type Props = Readonly<ResultProps>

/** Компонент Ошибочный результат. */
const ErrorResultContainer: FC<Props> = (props) => (
  <Result status={404}
          title={'Произошла ошибка'}
          subTitle={'Перезагрузите страницу. Если ошибка повторится, свяжитесь с администратором'}
          {...props}
  />
)

/** Компонент Ошибочный результат. */
export const ErrorResult = typedMemo(ErrorResultContainer);
