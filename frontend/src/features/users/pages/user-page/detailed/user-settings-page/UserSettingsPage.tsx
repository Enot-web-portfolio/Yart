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

const { TextArea } = Input;

type Props = Readonly<{
  updateUser?: () => void;
}>;

const UserSettingsPageComponent: FC<Props> = ({ updateUser }) => {
  const { editorUser, isLoading } = useEditorUserState();
  const currentUser = useCurrentUserStore(store => store.user);
  const updateCurrentUser = useCurrentUserStore(store => store.getCurrentUser);
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
      setLinks(parsedLinks.length > 0 ? parsedLinks : ['']);
      await UsersService.postUserEdit(currentUser.userId, { ...user, userAdditionalLinks: parsedLinks });
      await updateCurrentUser();
      updateUser?.();
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
