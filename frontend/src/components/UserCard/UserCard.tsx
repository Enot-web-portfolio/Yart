import React, { FC } from 'react';

import { Typography } from 'antd';

import { typedMemo } from '../../core/utils/typed-memo';

import { ShortUser } from '../../core/models/short-user';

import { UserAddIcon } from '../Icons';

import classes from './UserCard.module.scss';

const { Text } = Typography;
type Props = Readonly<ShortUser & {
  classes?: {
    container?: string;
    name?: string;
    works?: string;
    actions?: string;
    action?: string;
    image?: string;
  };
}>;

const UserCardComponents: FC<Props> = (props: Props) => (
  <div className={`${classes['user-card']} ${props.classes?.container ?? ''}`}>
    <div className={`${classes['user-card__info']}`}>
      <Text className={`${classes['user-card__info_name']} ${props.classes?.name ?? ''}`}>{props.userFullName}</Text>
      <Text className={`${classes['user-card__info_works']} ${props.classes?.works ?? ''}`}>Работы: {props.worksCount}</Text>
      <div className={`${classes['user-card__info_actions']} ${props.classes?.actions ?? ''}`}>
        <div className={`${classes['user-card__info_actions__action']} ${classes.circle} ${props.classes?.action ?? ''}`}>
          <UserAddIcon size={15}/>
        </div>
        <div className={`${classes['user-card__info_actions__action']} ${props.classes?.action ?? ''}`}>Профиль</div>
        <div className={`${classes['user-card__info_actions__action']} ${props.classes?.action ?? ''}`}>Сайт</div>
      </div>
    </div>
    <div className={`${classes['user-card__image']} ${props.classes?.image ?? ''}`} style={{ backgroundImage: `url(${props.userImageUrl})` }}/>
  </div>
);

export const UserCard = typedMemo(UserCardComponents);
