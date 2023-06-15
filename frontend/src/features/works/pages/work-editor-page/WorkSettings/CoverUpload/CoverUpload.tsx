import React, { FC, useState, useEffect } from 'react';

import { Button, Typography } from 'antd';

import { Modal } from '../../../../../../components/Modal';
import { EditingWork } from '../../../../../../core/models/editing-work';
import { WorkBlockType } from '../../../../../../core/models/work-block';

import { typedMemo } from '../../../../../../core/utils/typed-memo';

import classes from './CoverUpload.module.scss';

const { Text } = Typography;

type Props = Readonly<{
  isCoverSelected: boolean;
  setIsCoverSelected(active: boolean): void;
  setISettingsActive(active: boolean): void;
  orderCover: number | null;
  changeCover(order: number | null): void;
  work: EditingWork;
}>;

const CoverUploadComponent: FC<Props> = props => {
  const [currOrder, setCurrOrder] = useState(props.orderCover);

  useEffect(() => {
    props.setISettingsActive(!props.isCoverSelected);
  }, [props.isCoverSelected]);

  const coverUrl = currOrder !== null ? props.work.workBlock.find(work => work.blockOrder === currOrder)?.blockImageUrls[0] : '';
  const imageBlock = props.work.workBlock.filter(block => block.blockType === WorkBlockType.Image && block.blockImageUrls[0] !== undefined);
  return (
    <Modal isOutsideActive={props.isCoverSelected}
      modalClassName={`${classes['cover-upload']}`}
      setIsOutsideActive={props.setIsCoverSelected}
      component={
             setIsActive => (
          <>
            <div className={`${classes['cover-upload__image']}`} style={{ backgroundImage: `url('${coverUrl}')` }}/>
            <div className={`${classes['cover-upload__list']}`}>
              {imageBlock.map((block, i) => (
                <div key={i}
                  onClick={() => setCurrOrder(currOrder === block.blockOrder ? null : block.blockOrder)}
                  style={{ backgroundImage: `url('${block.blockImageUrls[0]}')` }}
                  className={`${classes['cover-upload__list_item']} ${block.blockOrder === currOrder ? classes.active : ''}`}/>
              ))}
            </div>
            {imageBlock.length === 0 &&
              <Text className={`${classes['cover-upload__empty_list']}`}>Добавь изображения в статью, чтобы выбрать обложку</Text>}
            <div className={`${classes['cover-upload__buttons']}`}>
              <Button type={'primary'}
                disabled={imageBlock.length === 0 || currOrder === null}
                onClick={() => {
                props.changeCover(currOrder);
                props.setIsCoverSelected(false);
              }}>Выбрать</Button>
              <Button type={'default'} onClick={() => setIsActive(false)}>Отмена</Button>
            </div>
          </>
        )}/>
  );
};

export const CoverUpload = typedMemo(CoverUploadComponent);
