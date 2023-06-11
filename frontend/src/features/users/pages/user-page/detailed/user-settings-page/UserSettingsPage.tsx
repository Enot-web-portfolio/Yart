import React, { FC, memo } from 'react';

import classes from './UserSettingsPage.module.scss';
import {ErrorMessage, Form, Formik} from "formik";
import {Button, Input, Typography} from "antd";
import {InputWithError} from "../../../../../../components/InputWithError";

const {Text} = Typography;

const UserSettingsPageComponent: FC = () => {
  const submit = () => {

  }

  const deleteLink = (order: number, links: string[]) => {
    return links.filter((_, i) => i !== order);
  }

  const changeLink = (order: number, links: string[], value: string) => {
    return links.map((link, i) => i === order ? value: link)
  }

  return(
    <div className={`${classes['user-settings']}`}>
      {/*<Formik initialValues={} onSubmit={}>
        {({values, setFieldValue, errors}) => (
          <Form>
          <div className={`${classes['user-settings__info-settings']}`}>
            <div className={`${classes['user-settings__main-settings']}`}>
              <div className={`${classes['user-settings__avatar']}`}>

              </div>
              <InputWithError value={values.firstName}
                              placeholder={'Имя'}
                              error={errors.firstName}
                              setValue={(value)=>setFieldValue('firstName', value)}/>
              <InputWithError value={values.lastName}
                              placeholder={'Фамилия'}
                              error={errors.lastName}
                              setValue={(value)=>setFieldValue('lastName', value)}/>
              <div className={`${classes['user-settings__email']}`}>
                <Text className={`${classes['user-settings__email_label']}`}>Почта:</Text>
                <Text className={`${classes['user-settings__email_value']}`}>test@test.ru</Text>
                <Button type={'text'} className={`${classes['user-settings__email_activate']}`}>Подтвердить</Button>
                <Button type={'text'} className={`${classes['user-settings__email_change']}`}>Изменить</Button>
              </div>
            </div>
            <div className={`${classes['user-settings__contact']}`}>
              <Text className={`${classes['user-settings__contact_header']}`}>Контакты</Text>
              <InputWithError value={values.city}
                              placeholder={'Город'}
                              error={errors.city}
                              setValue={(value)=>setFieldValue('city', value)}/>
              <Input value={values.city}
                       placeholder={'Компания'}
                       onChange={event => setFieldValue('firstName', event.target.value)}/>
              <InputWithError value={values.phone}
                              placeholder={'Телефон'}
                              error={errors.phone}
                              setValue={(value)=>setFieldValue('phone', value)}/>
              <Text className={`${classes['user-settings__contact_links__header']}`}>Ссылки</Text>
              <div className={`${classes['user-settings__contact_links']}`}>
                {values.links.map((link, i) =>
                  <Input value={values.city}
                        placeholder={'Ссылка'}
                        onChange={event => setFieldValue('firstName', event.target.value)}/>)}
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
      </Formik>*/}
    </div>
  )
};

export const UserSettingsPage = memo(UserSettingsPageComponent);
