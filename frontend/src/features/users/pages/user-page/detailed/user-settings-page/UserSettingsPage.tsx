import React, { FC, memo, useEffect, useRef, useState } from 'react';

import { ErrorMessage, Form, Formik } from 'formik';
import { Button, Input, Spin, Typography } from 'antd';

import { DefaultOptionType } from 'rc-select/lib/Select';

import { toast } from 'react-toastify';

import { InputWithError } from '../../../../../../components/InputWithError';
import { ErrorResult } from '../../../../../../components/ErrorResult';

import { EditorUser } from '../../../../../../core/models/editor-user';

import { Select } from '../../../../../../components/Select';

import { useSeparatedSkills } from '../../../../../../core/services/hooks/useSeparateSkills';

import { useSeparatedSecondarySkills } from '../../../../../../core/services/hooks/useSeparateSecondarySkills';

import { useCurrentUserStore } from '../../../../../../core/store/user/store';

import { UsersService } from '../../../../../../core/services/users-service';

import { FilesService } from '../../../../../../core/services/files-service';

import { useEditorUserState } from './useEditorUserState';

import classes from './UserSettingsPage.module.scss';
import { LinksEditor } from './LinksEditor';
import { AvatarUpload } from './AvatarUpload';
import { validationSchema } from './validationSchema';
import { EmailEditor } from './EmailEditor';

const { Text } = Typography;

const { TextArea } = Input;

type Props = Readonly<{

  /** Ф-ция обновления текущего пользователя. */
  updateUser?: () => void;
}>;

/** Компонент Настройки (Пользователь). */
const UserSettingsPageComponent: FC<Props> = ({ updateUser }) => {

  const { editorUser, isLoading } = useEditorUserState();

  /** Текущий авторизованный пользователь. */
  const currentUser = useCurrentUserStore(store => store.user);

  /** Ф-ция обновления авторизованного пользователя. */
  const updateCurrentUser = useCurrentUserStore(store => store.getCurrentUser);

  /** Дополнительные ссылки пользователя. */
  const [links, setLinks] = useState<string[]>(['']);

  /** Файл аватарки. */
  const [file, setFile] = useState<File | null>(null);

  /** Ссылка на файл. */
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  /** Категории для выбора в панели. */
  const { skills, isLoading: isSkillLoading } = useSeparatedSkills<DefaultOptionType>(skill => ({
    label: skill.name,
    value: skill.id,
  }));

  /** Дочерние категории для выбора в панели. */
  const {
    secondarySkills,
    isLoading: isSecondarySkillLoading,
  } = useSeparatedSecondarySkills<DefaultOptionType>(skill => ({ label: skill.name, value: skill.id }));

  useEffect(() => {
    if (editorUser) {
      setImageUrl(editorUser.userImageUrl);
    }
    if (editorUser && editorUser.userAdditionalLinks.length > 0) {
      setLinks(editorUser.userAdditionalLinks);
    }
  }, [editorUser]);

  /**
   * Ф-ция отправки формы.
   * @param user
   */
  const submit = async(user: EditorUser) => {
    if (currentUser === null || editorUser === null) {
      return;
    }

    let curImageUrl = imageUrl;
    if (file !== null) {
      try {
        const url = await FilesService.postAvatarFile(file);
        curImageUrl = url;
        setImageUrl(url);
      } catch (error: unknown) {

      }
    }

    try {
      const parsedLinks = links.map(link => link.trim()).filter(link => link.length > 0);
      setLinks(parsedLinks.length > 0 ? parsedLinks : ['']);
      await UsersService.postUserEdit(currentUser.userId, { ...user, userAdditionalLinks: parsedLinks, userImageUrl: curImageUrl });
      if (editorUser.userEmail !== user.userEmail) {
        await UsersService.postActivationResend(user.userEmail);
      }
      await updateCurrentUser();

      updateUser?.();
      toast.success('Данные сохранены');
    } catch (error: unknown) {
      toast.error('Произошла ошибка');
    }
  };

  const changeFile = (currFile: File | null) => {
    setFile(currFile);
    if (currFile) {
      setImageUrl(URL.createObjectURL(currFile));
    } else {
      setImageUrl(null);
    }
  };

  if (isLoading || isSkillLoading || isSecondarySkillLoading) {
    return <Spin/>;
  }
  if (editorUser === null || skills === null || secondarySkills === null || currentUser === null) {
    return <ErrorResult/>;
  }
  return (
    <div className={`${classes['user-settings']}`}>
      <Formik initialValues={{ ...editorUser }} onSubmit={submit} validationSchema={validationSchema}>
        {({ values, setFieldValue, errors }) => (
          <Form>
            <div className={`${classes['user-settings__info-settings']}`}>
              <div className={`${classes['user-settings__main-settings']}`}>
                <AvatarUpload url={imageUrl}
                  className={`${classes['user-settings__avatar']}`}
                  setFile={changeFile}/>
                <InputWithError value={values.userFirstName}
                  placeholder={'Имя'}
                  error={errors.userFirstName}
                  setValue={value => setFieldValue('userFirstName', value)}/>
                <InputWithError value={values.userLastName}
                  placeholder={'Фамилия'}
                  error={errors.userLastName}
                  setValue={value => setFieldValue('userLastName', value)}/>
                <EmailEditor value={values.userEmail}
                  setValue={value => setFieldValue('userEmail', value)}
                  className={`${classes['user-settings__email']}`}
                  isActive={currentUser.userIsActive ?? false}/>
              </div>
              <div className={`${classes['user-settings__contact']}`}>
                <Text className={`${classes['user-settings__contact_header']}`}>Контакты</Text>
                <InputWithError value={values.userCity ?? ''}
                  placeholder={'Город'}
                  error={errors.userCity}
                  setValue={value => setFieldValue('userCity', value)}/>
                <Input value={values.userCompany ?? ''}
                  placeholder={'Компания'}
                  onChange={event => setFieldValue('userCompany', event.target.value)}/>
                {/* <InputWithError
                  placeholder={'Телефон'}
                  error={errors.userPhone}/>*/}
                <LinksEditor links={links} setLinks={setLinks}
                  className={`${classes['user-settings__contact_links']}`}/>
              </div>
            </div>
            <div className={`${classes['user-settings__additional']}`}>
              <div className={`${classes['user-settings__additional__desc']}`}>
                <Text className={`${classes['user-settings__main-skills_header']}`}>О себе:</Text>
                <TextArea value={values.userDescription ?? ''}
                  autoSize
                  onChange={e => setFieldValue('userDescription', e.target.value)}/>
              </div>
              <div className={`${classes['user-settings__additional__main_skills']}`}>
                <Text className={`${classes['user-settings__main-skills_header']}`}>Категории навыков:</Text>
                <Select options={skills}
                  onChange={(value: string[]) => setFieldValue('userSelectedMainSkills', value)}
                  mode="multiple"
                  defaultValue={editorUser.userSelectedMainSkills}
                  placeholder="Что умеешь?"/>
                <Text type={'warning'} className={`${classes['user-settings__additional__main_skills_error']}`}>
                  <ErrorMessage name={'userSelectedMainSkills'}/>
                </Text>
              </div>
              <div className={`${classes['user-settings__secondary_skills']}`}>
                <Text className={`${classes['user-settings__secondary-skills_header']}`}>
                  Ключевые навыки
                  <Text className={`${classes['user-settings__secondary-skills_header_max']}`}>(макс 20)</Text>
                  :
                </Text>
                <Select options={secondarySkills}
                  onChange={(value: string[]) => setFieldValue('userSelectedSecondarySkills', value)}
                  mode="multiple"
                  defaultValue={editorUser.userSelectedSecondarySkills}
                  placeholder="А что именно? Уточни"/>
                <Text type={'warning'} className={`${classes['user-settings__secondary-skills_error']}`}>
                  <ErrorMessage name={'userSelectedSecondarySkills'}/>
                </Text>
              </div>
            </div>
            <Button className={`${classes['user-settings__submit']}`}
              type={'primary'}
              htmlType={'submit'}>Сохранить</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export const UserSettingsPage = memo(UserSettingsPageComponent);
