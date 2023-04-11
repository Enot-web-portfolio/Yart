import React, {FC} from 'react'
import {Button as ButtonAntd} from 'antd'
import {ButtonProps} from 'antd/es/button/button'
import './Button.scss'
import {ButtonBackgroundColor} from './types'
import {typedMemo} from 'src/core/utils/typed-memo'

type Props = ButtonProps & {
  // Ф-ция при клике
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  // Тип кнопки
  type: "primary" | "default" | "link";
  // Текст внутри кнопки
  text?: string;
  // Размер кнопки
  size?: "middle" | "small";
  // Цвет заливки кнопки
  backgroundColor?: ButtonBackgroundColor;
}

// Компонент Кнопка
const ButtonComponent: FC<Props> = ({
                                      backgroundColor = ButtonBackgroundColor.Primary,
                                      size = "middle",
                                      ...props
                                    }: Props) => {
  return <ButtonAntd {...props}
                     className={`button ${backgroundColor}_color ${size}_size`}>
    {props.text || ""}
  </ButtonAntd>
}

// Компонент Кнопка
export const Button = typedMemo(ButtonComponent);
