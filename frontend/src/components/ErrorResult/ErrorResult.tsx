import React, {FC} from 'react'
import {Result, ResultProps} from "antd";
import {typedMemo} from "../../core/utils/typed-memo";


type Props = Readonly<ResultProps>

/** Компонент Ошибочный результат (Здесь ничего нет). */
const ErrorResultContainer: FC<Props> = (props) => (
  <Result status={404}
          title={'Произошла ошибка'}
          subTitle={'Перезагрузите страницу. Если ошибка повториться, свяжитесь с администратором'}
          {...props}
  />
)

/** Компонент Ошибочный результат (Здесь ничего нет). */
export const ErrorResult = typedMemo(ErrorResultContainer);
