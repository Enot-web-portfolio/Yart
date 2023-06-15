import React, { FC, useRef } from 'react';

import { Upload, Typography } from 'antd';

import 'react-quill/dist/quill.snow.css';
import { UploadFile } from 'antd/es/upload/interface';
import { toast } from 'react-toastify';

import { CrossIcon } from '../../../../../../components/Icons';

import { typedMemo } from '../../../../../../core/utils/typed-memo';

import classes from './ImageBlock.module.scss';

const { Text } = Typography;

type Props = Readonly<{

  /** Изображение блока. */
  imageUrl: string | null;

  /** Ф-ция сохранения изображения. */
  setFile(file: File | null): void;
}>;

/**
 * Компонент Блок Изображение.
 * @param props
 */
const ImageBlockComponent: FC<Props> = props => {

  /** Доступные форматы изображения. */
  const accept = useRef(['jpg', 'png', 'webp']);

  /**
   * Ф-ция загрузки изображения.
   * @param file - Файл изображения.
   */
  const uploadImage = (file: UploadFile) => {
    if (file.originFileObj === undefined) {
      return null;
    }
    props.setFile(file.originFileObj || null);
  };

  /**
   * Ф-ция проверки файла перед загрузкой.
   * @param file - Файл изображения.
   */
  function beforeUpload(file: File) {
    const pathName = file.name.split('.');
    const maxSize = 8 * 1024 * 1024 * 2;

    let error = '';
    if (!accept.current.includes(pathName[pathName.length - 1])) {
      error = `Выбери изображение в формате ${accept.current.join(', ')}`;
    }
    if (file.size > maxSize) {
      if (error.length > 0) {
        error += ', не больше 2Мб';
      } else {
        error = 'Выбери изображение не больше 2Мб';
      }
    }

    if (error.length > 0) {
      toast.error(error);
      return false;
    }
  }

  return (
    <Upload
      name="avatar"
      accept={accept.current.reduce((prev, next) => prev += `.${next}, `, '')}
      listType="picture-card"
      className={`${classes['image-block']}`}
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={({ file }) => uploadImage(file)}
    >
      {props.imageUrl ?
        <div className={`${classes['image-block__file']}`} style={{ backgroundImage: `url('${props.imageUrl}')` }}>
          <div className={`${classes['image-block__delete']}`}>
            <CrossIcon className={`${classes['image-block__delete_icon']}`}
              onClick={e => {
                         e.stopPropagation();
                         props.setFile(null);
                       }}/>
          </div>
        </div> :
        <Text>Нажми или перетащи</Text>}
    </Upload>
  );
};

export const ImageBlock = typedMemo(ImageBlockComponent);
