import { UploadFile } from 'antd/es/upload/interface';

export const checkFileSize = (file: UploadFile, maxSize: number): boolean => file.size ? file.size / 1024 / 1024 < maxSize : false;
