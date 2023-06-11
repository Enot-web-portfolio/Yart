import React, {FC, memo, useContext} from 'react';

import classes from './UserSettingsPage.module.scss';
import {ErrorMessage, Form, Formik} from "formik";
import {Button, Input, Typography} from "antd";
import {InputWithError} from "../../../../../../components/InputWithError";
import {UserContext} from "../../context";
import {ErrorResult} from "../../../../../../components/ErrorResult";
import {User} from "../../../../../../core/models/user";

const {Text} = Typography;

const UserSettingsPageComponent: FC = () => {
  const user = useContext(UserContext);

  const submit = (user: User) => {

  }

  const deleteLink = (order: number, links: string[]) => {
    return links.filter((_, i) => i !== order);
  }

  const changeLink = (order: number, links: string[], value: string) => {
    return links.map((link, i) => i === order ? value : link)
  }

  console.log(user)
  if (user === null) return <ErrorResult/>
  return (
    <div className={`${classes['user-settings']}`}>
      <Formik initialValues={{...user}} onSubmit={submit}>
        {({values, setFieldValue, errors}) => (
          <Form>
            <div className={`${classes['user-settings__info-settings']}`}>
              <div className={`${classes['user-settings__main-settings']}`}>
                <div className={`${classes['user-settings__avatar']}`}>

                </div>
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
                  <Text className={`${classes['user-settings__email_value']}`}>{user.userEmail}</Text>
                  <Button type={'text'} className={`${classes['user-settings__email_activate']}`}>Подтвердить</Button>
                  <Button type={'text'} className={`${classes['user-settings__email_change']}`}>Изменить</Button>
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
                <div className={`${classes['user-settings__contact_links']}`}>
                  {values.userAdditionalLinks.map((link, i) =>
                    <Input value={link}
                           key={i}
                           placeholder={'Ссылка'}
                           onChange={event =>
                             setFieldValue('userAdditionalLinks', changeLink(i, values.userAdditionalLinks, event.target.value))}/>)}
                </div>
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
