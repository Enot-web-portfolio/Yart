import React, {FC, memo, useEffect, useState} from 'react';

import classes from './UserSettingsPage.module.scss';
import {Form, Formik} from "formik";
import {Button, Input, Spin, Typography, Upload} from "antd";
import {InputWithError} from "../../../../../../components/InputWithError";
import {ErrorResult} from "../../../../../../components/ErrorResult";
import {useEditorUserState} from "./useEditorUserState";
import {EditorUser} from "../../../../../../core/models/editor-user";
import {CrossIcon} from "../../../../../../components/Icons";
import {IconSize} from "../../../../../../components/Icons/types";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {UploadChangeParam, UploadFile} from "antd/es/upload/interface";

const {Text, Link} = Typography;

const UserSettingsPageComponent: FC = () => {
  const {editorUser, isLoading} = useEditorUserState();
  const [links, setLinks] = useState<string[]>(['']);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (editorUser && editorUser.userAdditionalLinks.length > 0) {
      setLinks(editorUser.userAdditionalLinks)
    }
  }, [editorUser])

  const submit = (user: EditorUser) => {

  }

  const deleteLink = (order: number) => {
    setLinks(curLinks =>
      curLinks.filter((_, i) => i !== order))
  }

  const addLink = () => {
    setLinks(curLinks => [...curLinks, ''])
  }

  const changeLink = (order: number, value: string) => {
    setLinks(curLinks =>
      curLinks.map((link, i) => i === order ? value : link))
  }

  const uploadImage = (info: UploadChangeParam): string | null => {
    const file = info.file.originFileObj;
    const parsedName = file ? file.name.split('.') : [''];
    const formats = ['jpg', 'png']
    if (info.file.status === 'done' && formats.includes(parsedName[parsedName.length - 1])) {
      setFile(info.file.originFileObj as File);
      return URL.createObjectURL(info.file.originFileObj as File);
    }
    return null;
  }

  if (isLoading) return <Spin/>
  if (editorUser === null) return <ErrorResult/>

  const uploadButton = (
    <div>
      <PlusOutlined rev/>
      <div style={{ marginTop: 8 }}>Загрузи аватарку (jpg или png)</div>
    </div>
  );

  return (
    <div className={`${classes['user-settings']}`}>
      <Formik initialValues={{...editorUser}} onSubmit={submit}>
        {({values, setFieldValue, errors}) => (
          <Form>
            <div className={`${classes['user-settings__info-settings']}`}>
              <div className={`${classes['user-settings__main-settings']}`}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className={`${classes['user-settings__avatar']}`}
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  onChange={uploadImage}
                >
                  {values.userImageUrl ? <img src={values.userImageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <InputWithError value={values.userFirstName}
                                placeholder={'Имя'}
                                error={errors.userFirstName}
                                setValue={(value) => setFieldValue('userFirstName', value)}/>
                <InputWithError value={values.userLastName}
                                placeholder={'Фамилия'}
                                error={errors.userLastName}
                                setValue={(value) => setFieldValue('userLastName', value)}/>
                <div className={`${classes['user-settings__email']}`}>
                  <Text className={`${classes['user-settings__email_label']}`}>Почта:</Text>
                  <Text className={`${classes['user-settings__email_value']}`}>{editorUser.userEmail}</Text>
                  <Link className={`${classes['user-settings__email_activate']}`}>Подтвердить</Link>
                  <Link className={`${classes['user-settings__email_change']}`}>Изменить</Link>
                </div>
              </div>
              <div className={`${classes['user-settings__contact']}`}>
                <Text className={`${classes['user-settings__contact_header']}`}>Контакты</Text>
                <InputWithError value={values.userCity ?? ''}
                                placeholder={'Город'}
                                error={errors.userCity}
                                setValue={(value) => setFieldValue('userCity', value)}/>
                <Input value={values.userCompany ?? ''}
                       placeholder={'Компания'}
                       onChange={event => setFieldValue('userCompany', event.target.value)}/>
                <InputWithError value={values.userPhone ?? ''}
                                placeholder={'Телефон'}
                                error={errors.userPhone}
                                setValue={(value) => setFieldValue('userPhone', value)}/>
                <Text className={`${classes['user-settings__contact_links__header']}`}>Ссылки</Text>
                {links.map((link, i) =>
                  <Input value={link}
                         key={i}
                         suffix={i !== 0 && <CrossIcon size={IconSize.Middle}
                                                       onClick={() => deleteLink(i)}
                                                       className={`${classes['user-settings__contact_links__delete']}`}/>}
                         placeholder={'Ссылка'}
                         onChange={event => changeLink(i, event.target.value)}/>)}
                <Button type={'default'}
                        className={`${classes['user-settings__contact_links__add']}`}
                        onClick={addLink}
                        icon={<img src={'/src/assets/icons/plus.svg'}
                                   className={`${classes['user-settings__contact_links__add_icon']}`}
                                   alt={'add link'}/>}/>
              </div>
            </div>
            <div className={`${classes['user-settings__additional']}`}>
              <Text className={`${classes['user-settings__main-skills_header']}`}>Основные навыки:</Text>
              <Text className={`${classes['user-settings__secondary-skills_header']}`}>Вторичные навыки:</Text>
            </div>
            <Button type={'primary'} htmlType={'submit'}>Сохранить</Button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export const UserSettingsPage = memo(UserSettingsPageComponent);
