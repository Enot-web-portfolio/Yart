import React, { FC } from 'react';
import { Upload, UploadProps, Typography } from 'antd';
import { typedMemo } from '../../core/utils/typed-memo';
import './DragAndDrop.scss';

const { Dragger } = Upload;
const { Text } = Typography;

type Props = Readonly<UploadProps & {

  // Максимальный размер файла в Мб
  maxSize: number;
}>;

// Компонент Drag&Drop
const DragAndDropComponent: FC<Props> = (props: Props) => (
  <Dragger {...props}
    className={'drag_and_drop'}
    showUploadList={{
               removeIcon: <img src={'/src/assets/icons/cross.svg'}/>,
    }}
    beforeUpload={() => false}>
    <div className="drag_and_drop__content">
      <Text>Перетащи или нажми</Text>
    </div>
  </Dragger>
);

// Компонент Drag&Drop
export const DragAndDrop = typedMemo(DragAndDropComponent);
