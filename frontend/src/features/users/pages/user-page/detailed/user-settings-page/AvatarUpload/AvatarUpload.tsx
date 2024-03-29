import React, { FC, useRef, useState } from 'react';

import { Upload, Typography } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { toast } from 'react-toastify';

import { CrossIcon } from '../../../../../../../components/Icons';

import { typedMemo } from '../../../../../../../core/utils/typed-memo';

import classes from './AvatarUpload.module.scss';

const { Text } = Typography;

type Props = Readonly<{

  /** Ссылка на аватар. */
  url: string | null;

  /** Ф-ция сохранения ссылки. */
  setFile: (file: File | null) => void;

  /** Класс для редактора аватарки. */
  className: string;
}>;

/** Компонент Редактор аватарки Пользователя. */
const AvatarUploadComponent: FC<Props> = ({ url, setFile, className }) => {

  /** Доступные форматы аватарки. */
  const accept = useRef(['jpg', 'png', 'webp']);

  /**
   * Ф-ция загрузки аватарки.
   * @param file
   */
  const uploadImage = (file: UploadFile) => {
    if (file.originFileObj === undefined) {
      return null;
    }
    setFile(file.originFileObj || null);
  };

  /**
   * Ф-ция проверки файла перед загрузкой.
   * @param file - Файл аватарки.
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
      className={`${classes['avatar-upload']} ${className}`}
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={({ file }) => uploadImage(file)}
    >
      {url ?
        <div className={`${classes['avatar-upload__file']}`}>
          <img src={url} alt="avatar" style={{ width: '100%' }}/>
          <div className={`${classes['avatar-upload__delete']}`}>
            <CrossIcon className={`${classes['avatar-upload__delete_icon']}`}
              onClick={e => {
                         e.stopPropagation();
                         setFile(null);
                       }}/>
          </div>
        </div> :
        <div className={`${classes['avatar-upload__desc']}`}>
          <CrossIcon className={`${classes['avatar-upload__add_icon']}`}/>
          <Text>Загрузи аватарку<br/> (jpg или png)</Text>
        </div>}
    </Upload>
  );
};

export const AvatarUpload = typedMemo(AvatarUploadComponent);
