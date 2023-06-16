import React, { FC, useState } from 'react';
import { Work } from 'src/core/models/work';
import { Typography } from 'antd';

import { NavLink } from 'react-router-dom';

import { toast } from 'react-toastify';

import { typedMemo } from '../../core/utils/typed-memo';
import { EditIcon, HeartFillIcon, HeartLineIcon } from '../Icons';
import { Tag } from '../Tag';
import { useCurrentUserStore } from '../../core/store/user/store';
import { useAuthStore } from '../../core/store/auth/store';
import { WorksService } from '../../core/services/works-service';

import { toUserWorks, toWorkEditor } from '../../routes/route-links';

import { useSkillsStore } from '../../core/store/skills/store';

import { useWorkReaderStore } from '../../core/store/work-reader/store';

import classes from './WorkCard.module.scss';

const { Text } = Typography;

type Props = Readonly<Work & {

  /** Id юзера, с которого смотрят работы. */
  pageUserId?: number | string;
}>;

/**
 * Компонент Карточка работы.
 * @param props
 */
const WorkCardComponent: FC<Props> = props => {

  const open = useWorkReaderStore(store => store.open);

  /** Скиллы. */
  const skills = useSkillsStore(store => store.defaultSkills);

  /** Авторизован ли пользователь. */
  const { isUserAuthorized } = useAuthStore();

  /** Текущий авторизованный пользователь. */
  const { user } = useCurrentUserStore();

  /** Отмечена ли работа как понравившаяся. */
  const [isLike, setIsLike] = useState(props.workIsLike);

  /** Ф-ция лайка работы. */
  const onWorkLike = () => {
    if (!isUserAuthorized || !user) {
      return null;
    }
    try {
      if (isLike) {
        WorksService.postWorkUnlike(props.workId, user.userId);
      } else {
        WorksService.postWorkLike(props.workId, user.userId);
      }
      setIsLike(curIsLike => !curIsLike);
    } catch (error: unknown) {
      toast.error('Произошла ошибка');
    }
  };

  return (
    <div className={`${classes['work-card']}`}
      onClick={() => open(props.workId)}>
      {props.workImageUrl == null ?
        <div className={`${classes['work-card__content']} ${classes['work-card_textual']}`}>
          <Text className={`${classes['work-card__content_name']}`}>{props.workName}</Text>
          <Text className={`${classes['work-card__content_text']}`}>{props.workStartText}</Text>
        </div> :
        <div className={`${classes['work-card__content']} ${classes['work-card_picture']}`}
          style={{ backgroundImage: `url('${props.workImageUrl}')` }}>
          <div className={`${classes['work-card__content_hover']}`}>
            <Text className={`${classes['work-card__content_name']}`}>{props.workName}</Text>
          </div>
        </div>
      }
      {isUserAuthorized && user && user.userId === props.userId &&
        <div className={`${classes['work-card__panel']}`}>
          <NavLink to={toWorkEditor(props.workId)}>
            <EditIcon className={`${classes['work-card__panel_edit']}`}/>
          </NavLink>
        </div>}
      <div className={`${classes['work-card__info']}`}>
        {props.pageUserId === undefined &&
          <NavLink to={toUserWorks(props.userId)} onClick={e => e.stopPropagation()}>
            <div className={`${classes['work-card__user-info']}`}>
              <div className={`${classes['work-card_user-img']}`}
                style={{ backgroundImage: `url('${props.userImageUrl}')` }}/>
              <Text className={`${classes['work-card_user-full-name']}`}>
                {props.userFirstName} {props.userLastName}
              </Text>
            </div>
          </NavLink>}
        {isUserAuthorized && user &&
          <div className={`${classes['work-card__like']}`} onClick={e => {
          e.stopPropagation();
          onWorkLike();
        }}>
            {isLike ?
              <HeartFillIcon size={30} fill={'#E61E59'} stroke={'#E61E59'}/> :
              <HeartLineIcon size={30} className={`${classes['work-card__line_icon']}`}/>}
            <Text className={`${classes['work-card__line_count']}`}>{props.workLikesCount + (props.workIsLike !== isLike ? !isLike ? -1 : 1 : 0)}</Text>
          </div>}
      </div>
      <div className={`${classes['work-card__tags']}`}>
        {skills && props.workMainSkills.map((skillId, i) => {
          const curSkill = skills.find(skill => skill.id === skillId);
          return curSkill ?
            <Tag textColor={curSkill.fontColor} color={curSkill.backgroundColor} key={i}>
              {curSkill.name}
            </Tag> :
            null;
        })}
      </div>
    </div>
  );
};

// Компонент Карточка работы
export const WorkCard = typedMemo(WorkCardComponent);
