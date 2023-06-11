import React, {FC, memo, useContext, useState} from 'react';

import {Spin, Typography} from "antd";

import classes from './UserAboutPage.module.scss';
import {useLocation} from "react-router-dom";
import {useUserState} from "../../useUserState";
import {ErrorResult} from "../../../../../../components/ErrorResult";
import {EmptyResult} from "../../../../../../components/EmptyResult";
import {UserContext} from "../../context";

const {Text} = Typography;

type LocationState = {
  userDescription: string | null;
  userSelectedSecondarySkills: string[];
}

const UserAboutPageComponent: FC = () => {
  const user = useContext(UserContext);

  if (user === null) return <ErrorResult/>
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
              <Text className={`${classes['user-about_skills_item']}`}>{skill}</Text>
            ))}
        </div>
      </div>
    </div>
  )
};

export const UserAboutPage = memo(UserAboutPageComponent);
