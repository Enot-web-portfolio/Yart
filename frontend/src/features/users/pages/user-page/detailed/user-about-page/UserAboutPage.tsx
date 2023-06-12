import React, { FC, memo } from 'react';

import { Typography } from 'antd';

import { EmptyResult } from '../../../../../../components/EmptyResult';
import { User } from '../../../../../../core/models/user';

import { ErrorResult } from '../../../../../../components/ErrorResult';

import classes from './UserAboutPage.module.scss';

const { Text } = Typography;

type Props = Readonly<{
  user?: User;
}>;

const UserAboutPageComponent: FC<Props> = ({ user }) => {
  if (!user) {
    return <ErrorResult/>;
  }
  return (
    <div className={`${classes['user-about']}`}>
      {user.userDescription &&
        <Text className={`${classes['user-about__description']}`}>{user.userDescription}</Text>}
      <div className={`${classes['user-about__skills_wrapper']}`}>
        <Text className={`${classes['user-about__skills_header']}`}>Ключевые навыки</Text>
        <div className={`${classes['user-about__skills']}`}>
          {user.userSelectedSecondarySkills.length === 0 ?
            <EmptyResult/> :
            user.userSelectedSecondarySkills.map((skill, i) => (
              <Text className={`${classes['user-about_skills_item']}`} key={i}>{skill}</Text>
            ))}
        </div>
      </div>
    </div>
  );
};

export const UserAboutPage = memo(UserAboutPageComponent);
