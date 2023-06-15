import React, { FC, memo, useState } from 'react';

import { Button, Input, Typography } from 'antd';

import { Spin } from 'antd/lib';

import { useNavigate } from 'react-router-dom';

import { WorkBlock, WorkBlockType } from '../../../../core/models/work-block';

import { ErrorResult } from '../../../../components/ErrorResult';

import classes from './WorkEditorPage.module.scss';
import { useWorkEditorState } from './useWorkEditorState';
import { BlockPanel } from './BlockPanel';
import { WorkSettings } from './WorkSettings';
import { AddBlockSelector } from './AddBlockSelector';
import { WorkPanelType } from './types';

import { TextBlock } from './blocks/TextBlock';
import { ConfirmLeaveBox } from './ConfirmLeaveBox';

const WorkEditorPageComponent: FC = () => {
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const { work, isSaving, isLoading, setWork, onWorkSave } = useWorkEditorState();
  const [panelType, setPanelType] = useState(WorkPanelType.None);
  const navigate = useNavigate();

  const addBlock = (block: WorkBlock) => {
    setWork(curWork => {
      if (curWork === null) {
        return null;
      }
      block.blockOrder = curWork.workBlock.length;
      return { ...curWork, workBlock: [...curWork.workBlock, block] };
    });
  };

  const changeBlockText = (order: number, value: string) => {
    setWork(curWork => {
      if (curWork === null) {
        return null;
      }
      return {
        ...curWork,
        workBlock: curWork.workBlock.map(block => ({ ...block, blockText: block.blockOrder === order ? value : block.blockText })),
      };
    });
  };

  if (isLoading) {
    return <Spin/>;
  }
  if (work === null) {
    return <ErrorResult/>;
  }
  return (
    <div className={`${classes['work-editor']}`}>
      <BlockPanel addBlock={addBlock} panelType={panelType} setPanelType={setPanelType}/>
      <WorkSettings/>

      <div className={`${classes['work-editor__buttons']}`}>
        <Button type={'default'} onClick={() => setIsLeaveModalOpen(true)}>Отмена</Button>
        <Button type={'primary'}>Продолжить</Button>
      </div>

      <div className={`${classes['work-editor__name']}`}>
        <Input placeholder={'Напиши мое имя'} className={'title'}/>
      </div>

      <AddBlockSelector onClick={() => setPanelType(WorkPanelType.Add)}/>

      {work.workBlock.map((block, i) => (
        <>
          {block.blockType === WorkBlockType.Text ?
            <TextBlock text={block.blockText}
              onClick={() => setPanelType(WorkPanelType.Text)}
              changeText={value => changeBlockText(block.blockOrder, value)}/> :
            null}
          <AddBlockSelector onClick={() => setPanelType(WorkPanelType.Add)}/>
        </>
      ))}
      <ConfirmLeaveBox isActive={isLeaveModalOpen} setActive={setIsLeaveModalOpen}/>
    </div>
  );
};

export const WorkEditorPage = memo(WorkEditorPageComponent);
