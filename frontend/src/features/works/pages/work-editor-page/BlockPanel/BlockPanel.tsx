import React, { FC, useEffect, useRef } from 'react';

import { typedMemo } from '../../../../../core/utils/typed-memo';

import { CrossIcon } from '../../../../../components/Icons';

import { useModalActivityState } from '../../../../../core/services/hooks/useModalActivityState';

import { WorkBlock } from '../../../../../core/models/work-block';

import { WorkPanelType } from '../types';

import classes from './BlockPanel.module.scss';
import { SelectBlock } from './SelectBlock';

type Props = Readonly<{

  /** Ф-ция добавления блока. */
  addBlock(block: WorkBlock): void;

  /** Тип правой панели. */
  panelType: WorkPanelType;

  /** Ф-ция сохранения типа правой панели. */
  setPanelType(type: WorkPanelType): void;
}>;

/**
 * Компонент Правая панель редактирования.
 * @param props
 */
const BlockPanelComponent: FC<Props> = props => {

  /** Ссылка на панель. */
  const panelRef = useRef<HTMLDivElement | null>(null);

  const { isActive, setIsActive } = useModalActivityState([panelRef.current], close);

  useEffect(() => {
    setIsActive(props.panelType !== WorkPanelType.None);
  }, [props.panelType]);

  /** Ф-ция закрытия панели. */
  function close() {
    setIsActive(false);
    props.setPanelType(WorkPanelType.None);
  }

  return (
    <div className={`${classes['block-panel']} ${isActive ? classes.active : ''}`} ref={panelRef}>
      <CrossIcon className={`${classes['block-panel__close']}`} onClick={close}/>
      <SelectBlock headerClassName={`${classes['block-panel__header']}`} addBlock={props.addBlock}/>
    </div>
  );
};

export const BlockPanel = typedMemo(BlockPanelComponent);
