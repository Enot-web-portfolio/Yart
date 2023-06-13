import React, { FC, useRef, useState } from 'react';

import { Upload } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';

import { CrossIcon } from '../../../../../../../components/Icons';

import { typedMemo } from '../../../../../../../core/utils/typed-memo';

import classes from './AvatarUpload.module.scss';

type Props = Readonly<{
  url: string | null;
  setUrl: (url: string | null) => void;
}>;

const AvatarUploadComponent: FC<Props> = ({ url, setUrl }) => {
  const [avatar, setAvatar] = useState<File | null>(null);

  /** Accept format for cover. */
  const accept = useRef(['jpg', 'png', 'webp']);
  const uploadImage = (file: UploadFile): string | null => {
    if (file.originFileObj === undefined) {
      return null;
    }
    setAvatar(file.originFileObj || null);
    return URL.createObjectURL(file.originFileObj as Blob);
  };

  /**
   * Check file before upload.
   * @param file
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
      className={`${classes['avatar-upload']}`}
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={({ file }) => setUrl(uploadImage(file))}
    >
      {url ?
        <div className={`${classes['avatar-upload__file']}`}>
          <img src={url} alt="avatar" style={{ width: '100%' }}/>
          <div className={`${classes['avatar-upload__delete']}`}>
            <CrossIcon className={`${classes['avatar-upload__delete_icon']}`}
              onClick={e => {
                         e.stopPropagation();
                         setAvatar(null);
                         setUrl(null);
                       }}/>
          </div>
        </div> :
        <div className={`${classes['avatar-upload__desc']}`}>
          <PlusOutlined rev/>
          <p>Загрузи аватарку<br/> (jpg или png)</p>
        </div>}
    </Upload>
  );
};

export const AvatarUpload = typedMemo(AvatarUploadComponent);