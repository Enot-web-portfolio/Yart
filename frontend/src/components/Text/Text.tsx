import React, {FC} from 'react'
import {TextSize, TextColor} from "./types";
import './Text.scss'
import {Typography} from 'antd'
import {TextProps} from 'antd/es/typography/Text'
import {typedMemo} from 'src/core/utils/typed-memo'

const {Text: TextAntd} = Typography

type Props = TextProps & {
  // Размер текста
  size: TextSize;
  // Цвет текста
  color: TextColor;
}

// Компонент Текст
const TextComponent: FC<Props> = (props: Props) => {
  return <TextAntd {...props} className={`text fs_${props.size}_px ${props.color}_color`}>daw</TextAntd>
}

// Компонент Текст
export const Text = typedMemo(TextComponent);
