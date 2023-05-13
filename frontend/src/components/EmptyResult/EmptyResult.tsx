import React, {FC} from 'react'
import {FindIcon} from "../Icons/FindIcon";
import {Result} from "antd";
import {typedMemo} from "../../core/utils/typed-memo";


type Props = Readonly<{

  /** Class name for Result/ */
  className?: string;

  /** Stroke color icon. */
  iconColor?: string;
}>

/** Компонент Пустой результат (Здесь ничего нет). */
const EmptyResultContainer: FC<Props> = (props) => (
  <Result  className={props.className || ''} icon={<FindIcon size={100} stroke={props.iconColor || '#000'}/>} title={'Здесь пока ничего нет'}/>
)

/** Компонент Пустой результат (Здесь ничего нет). */
export const EmptyResult = typedMemo(EmptyResultContainer);
