import React, { FC, memo, useRef, useState } from 'react';

import { Button, Input } from 'antd';

import { Spin } from 'antd/lib';

import { Navigate, useNavigate } from 'react-router-dom';

import { WorkBlock, WorkBlockType } from '../../../../core/models/work-block';

import { ErrorResult } from '../../../../components/ErrorResult';

import { useAuthStore } from '../../../../core/store/auth/store';

import { toWorks } from '../../../../routes/route-links';

import classes from './WorkEditorPage.module.scss';
import { useWorkEditorState } from './useWorkEditorState';
import { BlockPanel } from './BlockPanel';
import { WorkSettings } from './WorkSettings';
import { AddBlockSelector } from './AddBlockSelector';
import { WorkPanelType } from './types';

import { TextBlock } from './blocks/TextBlock';
import { ConfirmLeaveBox } from './ConfirmLeaveBox';
import { ImageBlock } from './blocks/ImageBlock';

/** Страница Редактор работ. */
const WorkEditorPageComponent: FC = () => {

  /** Авторизован ли пользователь. */
  const isUserAuthorized = useAuthStore(store => store.isUserAuthorized);

  /** Открыто ли окно выхода из редактора. */
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const { work, isSaving, isLoading, setWork, onWorkSave } = useWorkEditorState();

  /** Тип открытой правой панели. */
  const [panelType, setPanelType] = useState(WorkPanelType.None);

  /**
   * Ф-ция добавления блока.
   * @param block - Обьект блока.
   */
  const addBlock = (block: WorkBlock) => {
    setWork(curWork => {
      if (curWork === null) {
        return null;
      }
      block.blockOrder = curWork.workBlock.length;
      return { ...curWork, workBlock: [...curWork.workBlock, block] };
    });
    setPanelType(WorkPanelType.None);
  };

  /**
   * Ф-ция изменения текста блока.
   * @param order - Порядковый номер блока.
   * @param value - Текст блока.
   */
  const changeBlockText = (order: number, value: string) => {
    setWork(curWork => {
      if (curWork === null) {
        return null;
      }
      return {
        ...curWork,
        workBlock: curWork.workBlock.map(block => ({
          ...block,
          blockText: block.blockOrder === order ? value : block.blockText,
        })),
      };
    });
  };

  /**
   * Ф-ция изменения изображения блока.
   * @param order - Порядковый номер блока.
   * @param value - Изображение блока.
   */
  const changeBlockImage = (order: number, value: File | null) => {
    setWork(curWork => {
      if (curWork === null) {
        return null;
      }
      return {
        ...curWork,
        workBlock: curWork.workBlock.map(block => ({
          ...block,
          blockImage: block.blockOrder === order ? value : block.blockImage,
          blockImageUrls: block.blockOrder === order ? value ? [URL.createObjectURL(value)] : [] : block.blockImageUrls,
        })),
      };
    });
  };

  if (!isUserAuthorized) {
    return <Navigate to={toWorks()}/>;
  }
  if (isLoading) {
    return <Spin/>;
  }
  if (work === null) {
    return <ErrorResult/>;
  }
  return (
    <div className={`${classes['work-editor']}`}>
      <BlockPanel addBlock={addBlock} panelType={panelType} setPanelType={setPanelType}/>

      <div className={`${classes['work-editor__buttons']}`}>
        <Button type={'default'} onClick={() => setIsLeaveModalOpen(true)}>Отмена</Button>
        <WorkSettings work={work} save={onWorkSave} isSaving={isSaving}/>
      </div>

      <div className={`${classes['work-editor__name']}`}>
        <Input value={work.workName}
          onChange={e => setWork(curWork => curWork !== null ?
            ({ ...curWork, workName: e.target.value }) : null)}
          placeholder={'Напиши мое имя'}
          className={'title'}/>
      </div>

      <AddBlockSelector onClick={() => setPanelType(WorkPanelType.Add)}/>

      {work.workBlock.map((block, i) => (
        <>
          {block.blockType === WorkBlockType.Text ?
            <TextBlock text={block.blockText}
              changeText={value => changeBlockText(block.blockOrder, value)}/> :
            <ImageBlock imageUrl={block.blockImageUrls[0]}
              setFile={file => changeBlockImage(block.blockOrder, file)}/>}
          <AddBlockSelector onClick={() => setPanelType(WorkPanelType.Add)}/>
        </>
      ))}
      <ConfirmLeaveBox isActive={isLeaveModalOpen} setActive={setIsLeaveModalOpen}/>
    </div>
  );
};

export const WorkEditorPage = memo(WorkEditorPageComponent);
