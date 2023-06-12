import React, { FC, memo, useEffect, useState } from 'react';

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

import { useEditorUserState } from './useEditorUserState';

import classes from './UserSettingsPage.module.scss';
import { LinksEditor } from './LinksEditor';
import { AvatarUpload } from './AvatarUpload';
import { validationSchema } from './validationSchema';

const { Text, Link } = Typography;

const UserSettingsPageComponent: FC = () => {
  const { editorUser, isLoading } = useEditorUserState();
  const currentUser = useCurrentUserStore(store => store.user);
  const [links, setLinks] = useState<string[]>(['']);

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
    if (editorUser && editorUser.userAdditionalLinks.length > 0) {
      setLinks(editorUser.userAdditionalLinks);
    }
  }, [editorUser]);

  const submit = async(user: EditorUser) => {
    if (currentUser === null) {
      return;
    }
    try {
      const parsedLinks = links.map(link => link.trim()).filter(link => link.length > 0);
      setLinks(parsedLinks);
      await UsersService.postUserEdit(currentUser.userId, { ...user, userAdditionalLinks: parsedLinks });
      toast.success('Данные сохранены');
    } catch (error: unknown) {
      toast.error('Произошла ошибка');
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
                <AvatarUpload url={values.userImageUrl} setUrl={url => setFieldValue('userImageUrl', url)}/>
                <InputWithError value={values.userFirstName}
                  placeholder={'Имя'}
                  error={errors.userFirstName}
                  setValue={value => setFieldValue('userFirstName', value)}/>
                <InputWithError value={values.userLastName}
                  placeholder={'Фамилия'}
                  error={errors.userLastName}
                  setValue={value => setFieldValue('userLastName', value)}/>
                <div className={`${classes['user-settings__email']}`}>
                  <Text className={`${classes['user-settings__email_label']}`}>Почта:</Text>
                  <Text className={`${classes['user-settings__email_value']}`}>{editorUser.userEmail}</Text>
                  {!currentUser.userIsActive &&
                    <Link className={`${classes['user-settings__email_activate']}`}>Подтвердить</Link>}
                  <Link className={`${classes['user-settings__email_change']}`}>Изменить</Link>
                </div>
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
                <InputWithError value={values.userPhone ?? ''}
                  placeholder={'Телефон'}
                  error={errors.userPhone}
                  setValue={value => setFieldValue('userPhone', value)}/>
                <LinksEditor links={links} setLinks={setLinks}
                  className={`${classes['user-settings__contact_links']}`}/>
              </div>
            </div>
            <div className={`${classes['user-settings__additional']}`}>
              <div className={`${classes['user-settings__additional__main_skills']}`}>
                <Text className={`${classes['user-settings__main-skills_header']}`}>Категории навыков:</Text>
                <Select options={skills}
                  onChange={(value: string[]) => setFieldValue('userSelectedMainSkills', value)}
                  mode="multiple"
                  placeholder="Что умеешь?"/>
                <Text type={'warning'} className={`${classes['user-settings__additional__main_skills_error']}`}>
                  <ErrorMessage name={'userSelectedMainSkills'}/>
                </Text>
              </div>

              <Text className={`${classes['user-settings__secondary-skills_header']}`}>
                Ключевые навыки
                <Text className={`${classes['user-settings__secondary-skills_header_max']}`}>(макс 20)</Text>
                :
              </Text>
              <Select options={secondarySkills}
                onChange={(value: string[]) => setFieldValue('userSelectedSecondarySkills', value)}
                mode="multiple"
                placeholder="А что именно? Уточни"/>
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
