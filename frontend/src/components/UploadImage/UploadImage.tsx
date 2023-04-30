import React, { FC, useState } from 'react';

import { Upload, UploadProps, Typography } from 'antd';
import './UploadImage.scss';
import { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';

import { checkFileSize } from '../../core/utils/check-file-size';

import { typedMemo } from '../../core/utils/typed-memo';

const { Text } = Typography;
type Props = Readonly<UploadProps & {

  /** Максимальный размер файла в Мб. */
  maxSize: number;

  /** Ссылка выбранного изображения. */
  imageUrl: string | null;
}>;

// Компонент Drag&Drop для одного изображения
const UploadImageComponent: FC<Props> = (props: Props) => {
  // Текст ошибки при загрузке файла
  const [error, setError] = useState<string | null>(null);

  // Ф-ция сохранения файла
  const handleChange = (info: UploadChangeParam) => {
    if (!checkError(checkFileSize(info.fileList[0], props.maxSize), 'Максимальный размер файла 2 Мб') &&
      !checkError(checkIsImage(info.fileList[0]), 'Выбери файл в формате jpeg/png')) {
      props.onChange?.(info);
    }
  };

  // Ф-ция проверки файла на ошибку
  const checkError = (hasError: boolean, errorText: string): boolean => {
    if (hasError) {
      setError(errorText);
      setTimeout(() => setError(null), 2000);
      return true;
    }
    return false;
  };

  // Ф-ция проверки формата файла
  const checkIsImage = (file: UploadFile) => file.type === 'image/jpeg' || file.type === 'image/png';

  return (
    <div className={'uploader_image'}>
      <Upload
        name="avatar"
        maxCount={1}
        accept="image/png, image/jpeg"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={() => false}
        {...props}
        onChange={handleChange}
      >
        {props.imageUrl ?
          <div style={{ backgroundImage: `url(${props.imageUrl})` }}
            className={'uploader_image__preview'}/> :
          <div className="uploader_image__empty_content">
            <Text>Выбери изображение</Text>
          </div>
        }

        <div className={'uploader_image__button'}>
          <img alt={'upload button'} src={'/src/assets/icons/image.svg'}/>
        </div>
      </Upload>

      {error &&
        <Text className={'uploader_image__error'}>{error}</Text>}
    </div>
  );
};

// Компонент Drag&Drop для одного изображения
export const UploadImage = typedMemo(UploadImageComponent);
