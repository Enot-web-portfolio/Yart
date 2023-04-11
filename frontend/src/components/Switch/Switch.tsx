import React, {FC, useState} from 'react';
import {Switch as SwitchAntd} from 'antd';
import {SwitchProps, SwitchChangeEventHandler} from 'antd/es/switch';
import './Switch.scss';
import {typedMemo} from 'src/core/utils/typed-memo';

type Props = SwitchProps & {
  // Ф-ция клика на Switch
  onClick: SwitchChangeEventHandler;
}

// Компонент Switch(toggle)
const SwitchComponent: FC<Props> = (props: Props) => {
  return <SwitchAntd {...props}
                     className={`switch`}/>
}

// Компонент Switch(toggle)
export const Switch = typedMemo(SwitchComponent);
