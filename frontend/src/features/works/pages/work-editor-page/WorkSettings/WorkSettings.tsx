import React, { FC, useState } from 'react';

import { Button, Spin, Switch, Typography, Upload } from 'antd';

import { Formik, Form, ErrorMessage } from 'formik';

import { UploadFile } from 'antd/es/upload/interface';

import { toast } from 'react-toastify';

import { typedMemo } from '../../../../../core/utils/typed-memo';

import { Modal } from '../../../../../components/Modal';

import { Select } from '../../../../../components/Select';
import { useSeparatedSkills } from '../../../../../core/services/hooks/useSeparateSkills';
import { ErrorResult } from '../../../../../components/ErrorResult';

import { EditingWork } from '../../../../../core/models/editing-work';

import { CrossIcon } from '../../../../../components/Icons';

import { workBlockMapper } from '../../../../../core/services/mappers/workBlockMapper';

import classes from './WorkSettings.module.scss';
import { CoverUpload } from './CoverUpload';
import { validationSchema } from './validationSchema';

const { Text, Link } = Typography;

type Props = Readonly<{
  work: EditingWork;
  save(work: EditingWork, files: File[]): void;
  isSaving: boolean;
}>;

const WorkSettingsComponent: FC<Props> = props => {
  const [isWorkModalActive, setIsWorkModalActive] = useState(false);
  const [isCoverSelected, setIsCoverSelected] = useState(false);
  const { skills, isLoading } = useSeparatedSkills(skill => ({ value: skill.id, label: skill.name }));
  const [files, setFiles] = useState<File[]>([]);
  const [orderBlockCover, setOrderBlockCover] = useState<number | null>(null);

  const coverUrl = orderBlockCover !== null ? props.work.workBlock.find(work => work.blockOrder === orderBlockCover)?.blockImageUrls[0] : '';
  return (
    <>
      <Button type={'primary'}
        disabled={props.work.workName.trim().length === 0 || props.work.workBlock.length === 0}
        onClick={() => setIsWorkModalActive(true)}>
        Продолжить
      </Button>
      <CoverUpload isCoverSelected={isCoverSelected}
        setIsCoverSelected={setIsCoverSelected}
        setISettingsActive={setIsWorkModalActive}
        orderCover={orderBlockCover}
        changeCover={setOrderBlockCover}
        work={props.work}/>
      <Modal isOutsideActive={isWorkModalActive}
        isNotClickAway={true}
        setIsOutsideActive={setIsWorkModalActive}
        component={
          (setIsActive, isActive) =>
                 isLoading ?
                   <Spin/> :
                   skills === null ?
                     <ErrorResult/> :
                     <Formik initialValues={props.work}
                       validationSchema={validationSchema}
                       validateOnBlur={true}
                       onSubmit={work => props.save({ ...work, workBlock: props.work.workBlock }, files)}>
                       {({ values, setFieldValue, errors }) => (
                         <Form className={`${classes['work-settings']}`}>
                           <CrossIcon className={`${classes['work-settings__close']}`}
                             onClick={() => setIsActive(false)}/>
                           <Text className={`${classes['work-settings__header']}`}>Финальная настройка</Text>
                           <div className={`${classes['work-settings__main']}`}>
                             <div className={`${classes['work-settings__cover']}`}>
                               <Text>
                                   Обложка
                               </Text>
                               <div className={`${classes['work-settings__cover__image']}`}
                                 style={{ backgroundImage: `url('${coverUrl}')` }}/>
                               <Link onClick={() => setIsCoverSelected(true)}
                                 className={`${classes['work-settings__cover__btn']}`}>Выбрать изображение</Link>
                             </div>
                           </div>
                           <div className={`${classes['work-settings__secondary']}`}>
                             <div className={`${classes['work-settings__main_skills']}`}>
                               <Text>
                                   Категории
                                 <Text className={`${classes['work-settings__subtitle']}`}>(макс. 2)</Text>
                               </Text>
                               <Select options={skills}
                                 onChange={(value: string[]) => {
                                           setFieldValue('workMainSkills', value);
                                         }}
                                 mode="multiple"
                                 defaultValue={props.work.workMainSkills}
                                 placeholder="Какая работа?"/>
                               <Text type={'warning'} className={`${classes['work-settings__main_skills_error']}`}>
                                 <ErrorMessage name={'workMainSkills'}/>
                               </Text>
                             </div>
                             <div className={`${classes['work-settings__comments']}`}>
                               <Text>Открыть комментарии</Text>
                               <Switch checked={values.openComments}
                                 onChange={value => setFieldValue('openComments', value)}/>
                             </div>
                             {/* <div className={`${classes['work-settings__files']}`}>
                               <Text>
                                 Файлы
                                 <Text className={`${classes['work-settings__subtitle']}`}>(макс. 3)</Text>
                               </Text>
                               <Upload
                                 name={'file'}
                                 multiple
                                 className={`${classes['work-settings__files__upload']}`}
                                 showUploadList={true}
                                 action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                 beforeUpload={beforeUpload}
                                 onChange={({fileList}) => upload(fileList)}
                               >
                                 <Text>Нажми или перетащи</Text>
                               </Upload>
                             </div>*/}
                             <div className={`${classes['work-settings__buttons']}`}>
                               <Button type={'default'} onClick={() => setIsActive(false)}>Отмена</Button>
                               <Button type={'primary'} htmlType={'submit'}>Сохранить</Button>
                             </div>
                           </div>
                         </Form>
                       )}
                     </Formik>
        }/>
    </>
  );
};

export const WorkSettings = typedMemo(WorkSettingsComponent);
