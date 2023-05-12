import React, { FC } from 'react';

import { Typography } from 'antd';

import { typedMemo } from '../../core/utils/typed-memo';

import { ShortUser } from '../../core/models/short-user';

import { UserAddIcon } from '../Icons';

import classes from './UserCard.module.scss';

const { Text } = Typography;
type Props = Readonly<ShortUser>;

const UserCardComponents: FC<Props> = (props: Props) => (
  <div className={`${classes['user-card']}`}>
    <div className={`${classes['user-card__info']}`}>
      <Text className={`${classes['user-card__info_name']}`}>{props.userFullName}</Text>
      <Text className={`${classes['user-card__info_works']}`}>Работы: {props.worksCount}</Text>
      <div className={`${classes['user-card__info_actions']}`}>
        <div className={`${classes['user-card__info_actions_action']} ${classes.circle}`}>
          <UserAddIcon size={15}/>
        </div>
        <div className={`${classes['user-card__info_actions_action']}`}>Профиль</div>
        <div className={`${classes['user-card__info_actions_action']}`}>Сайт</div>
      </div>
    </div>
    <div className={`${classes['user-card__image']}`} style={{ backgroundImage: `url(${props.userImageUrl})` }}/>
  </div>
);

export const UserCard = typedMemo(UserCardComponents);
