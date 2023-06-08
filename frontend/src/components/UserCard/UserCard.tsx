import React, { FC, useState } from 'react';
import { Tooltip, Typography } from 'antd';

import { NavLink } from 'react-router-dom';

import { toast } from 'react-toastify';

import { typedMemo } from '../../core/utils/typed-memo';
import { ShortUser } from '../../core/models/short-user';
import { UserAddIcon } from '../Icons';

import { useAuthStore } from '../../core/store/auth/store';

import { toUserWorks } from '../../routes/route-links';

import { UsersService } from '../../core/services/users-service';

import { UnsubscribeIcon } from '../Icons/UnsubscribeIcon';

import { useCurrentUserStore } from '../../core/store/user/store';

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

// TODO добавить Link, когда перейду к лк
// TODO добавить ф-цию подписки, если авторизован(после авторизации)
/**
 * Компонент Карточка пользователя.
 * @param props
 */
const UserCardComponents: FC<Props> = (props: Props) => {
  const isUserAuthorized = useAuthStore(store => store.isUserAuthorized);
  const currentUser = useCurrentUserStore(store => store.user);
  const [isSubscribe, setIsSubscribe] = useState(props.isSubscribe);

  /** Toggle subscribe. */
  async function onSubscribe() {
    const res = isSubscribe ?
      await UsersService.postUnsubscribeUser(props.userId) :
      await UsersService.postSubscribeUser(props.userId);

    if (res) {
      setIsSubscribe(curIsSubscribe => !curIsSubscribe);
    } else {
      toast.error('Произошла ошибка');
    }
  }

  return (
    <div className={`${classes['user-card']} ${props.classes?.container ?? ''}`}>
      <div className={`${classes['user-card__info']}`}>
        <Text className={`${classes['user-card__info_name']} ${props.classes?.name ?? ''}`}>{props.userFullName}</Text>
        <Text
          className={`${classes['user-card__info_works']} ${props.classes?.works ?? ''}`}>Работы: {props.worksCount}</Text>
        <div className={`${classes['user-card__info_actions']} ${props.classes?.actions ?? ''}`}>
          {isUserAuthorized && currentUser && currentUser.userId !== props.userId &&
            <Tooltip title={isSubscribe ? 'Отписаться' : 'Подписаться'}>
              <div onClick={onSubscribe}
                className={`${classes['user-card__info_actions__action']} ${classes.circle} ${props.classes?.action ?? ''} ${isSubscribe ? classes.unsubscribe : ''}`}>
                {isSubscribe ?
                  <UnsubscribeIcon size={15}/> :
                  <UserAddIcon size={15}/>}
              </div>
            </Tooltip>}
          <NavLink to={toUserWorks(props.userId)}>
            <div className={`${classes['user-card__info_actions__action']} ${props.classes?.action ?? ''}`}>
              Профиль
            </div>
          </NavLink>
          {/* <div className={`${classes['user-card__info_actions__action']} ${props.classes?.action ?? ''}`}>Сайт</div>*/}
        </div>
      </div>
      <div className={`${classes['user-card__image']} ${props.classes?.image ?? ''}`}
        style={{ backgroundImage: `url(${props.userImageUrl})` }}/>
    </div>
  );
};

/** Компонент Карточка пользователя. */
export const UserCard = typedMemo(UserCardComponents);
