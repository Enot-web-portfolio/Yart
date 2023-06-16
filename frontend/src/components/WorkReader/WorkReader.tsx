import React, { FC, memo, useEffect, useState } from 'react';

import { Button, Typography } from 'antd';

import { NavLink } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useWorkReaderStore } from '../../core/store/work-reader/store';

import { CrossIcon, HeartFillIcon, HeartLineIcon } from '../Icons';

import { WorksGrid } from '../WorksGrid';

import { useSkillsStore } from '../../core/store/skills/store';

import { toUserWorks } from '../../routes/route-links';

import { WorkBlockType } from '../../core/models/work-block';

import { useCurrentUserStore } from '../../core/store/user/store';

import { WorksService } from '../../core/services/works-service';

import classes from './WorkReader.module.scss';
import { useWorkReaderState } from './useWorkReaderState';

const { Text, Link } = Typography;

const WorkReaderComponent: FC = () => {
  const workId = useWorkReaderStore(store => store.workId);
  const close = useWorkReaderStore(store => store.close);
  const { work } = useWorkReaderState(workId);
  const skills = useSkillsStore(store => store.defaultSkills);
  const [isLike, setIsLike] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const currentUser = useCurrentUserStore(store => store.user);

  useEffect(() => {
    if (work) {
      setIsLike(work.workIsLike);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [work]);

  const toggleLike = async() => {
    if (!currentUser || !work) {
      return;
    }

    try {
      setIsLikeLoading(true);
      if (isLike) {
        await WorksService.postWorkUnlike(work.workId, currentUser.userId);
      } else {
        await WorksService.postWorkLike(work.workId, currentUser.userId);
      }
      setIsLike(isLike => !isLike);
    } catch (error: unknown) {
      toast.error('Произошла ошибка');
    } finally {
      setIsLikeLoading(false);
    }
  };

  return (
    <div className={`${classes['work-reader__wrapper']} ${work ? classes.active : ''}`}>
      <div className={`${classes['work-reader__close']}`} onClick={close}>
        <CrossIcon className={`${classes['work-reader__close_icon']}`}/>
      </div>
      {work &&
        <div className={`${classes['work-reader__scroll']}`}>
          <div className={`${classes['work-reader']}`}>
            <div className={`${classes['work-reader__header']}`}>
              <div className={`${classes['work-reader__header_author']}`}>
                <div className={`${classes['work-reader__header_author__img']}`}
                  style={{ backgroundImage: `url('${work.userImageUrl}')` }}/>
                <Text className={`${classes['work-reader__header_name']}`}>{work.workName}</Text>
                <div className={`${classes['work-reader__header_author__data']}`}>
                  <Text
                    className={`${classes['work-reader__header_author__name']}`}>{work.userFirstName} {work.userLastName}</Text>
                  {currentUser !== null && currentUser.userId !== work.userId &&
                    <>
                      <div className={`${classes['work-reader__header_author_dot']}`}/>
                      <Link className={`${classes['work-reader__header_author__subscribe']}`}>Подписаться</Link>
                    </>}
                </div>
              </div>

              {currentUser === null ?
                null :
                !isLike ?
                  <Button type={'primary'} loading={isLikeLoading} onClick={toggleLike}
                    icon={<HeartFillIcon className={`${classes['work-reader__like_icon']}`}/>}>Нравится</Button> :
                  <Button type={'default'} loading={isLikeLoading} onClick={toggleLike}
                    icon={<HeartFillIcon
                      className={`${classes['work-reader__like_icon_unlike']}`}/>}>{work.workLikesCount}</Button>}
            </div>
            {skills && <Text className={`${classes['work-reader__skills']}`}>
              {work.workMainSkills.reduce((prev, next) => {
                const curSkill = skills.find(skill => skill.id === next);
                return curSkill ? `${prev} ${curSkill.name}` : prev;
              }, '')}
            </Text>}

            <div className={`${classes['work-reader__content']}`}>
              {work.workBlocks.map((block, i) =>
                block.blockType === WorkBlockType.Text ?
                  <div dangerouslySetInnerHTML={{ __html: block.blockText }} key={i}/> :
                  <div className={`${classes['work-reader__content_image']}`}
                    style={{ backgroundImage: `url('${block.blockImageUrls[0]}')` }} key={i}/>)}
            </div>

            <div className={`${classes['work-reader__author']}`}>
              <div className={`${classes['work-reader__author_image_wrapper']}`}>
                <div className={`${classes['work-reader__author_image_line']}`}/>
                <div className={`${classes['work-reader__author_image']}`}
                  style={{ backgroundImage: `url('${work.userImageUrl}')` }}/>
                <div className={`${classes['work-reader__author_image_line']}`}/>
              </div>
              <Text className={`${classes['work-reader__author_name']}`}>{work.userFirstName} {work.userLastName}</Text>
              <Text className={`${classes['work-reader__author_skills']}`}>Skiils</Text>
              {currentUser !== null && currentUser.userId !== work.userId && <Button type={'primary'}>Подписаться</Button>}
            </div>

            <div className={`${classes['work-reader__author_work']}`}>
              <div className={`${classes['work-reader__author_work__header']}`}>
                <Text className={`${classes['work-reader__author_work__desc']}`}>Больше
                  от {work.userFirstName} {work.userLastName}</Text>
                <NavLink to={toUserWorks(work.userId)} onClick={close}>
                  <Link className={`${classes['work-reader__author_work__work']}`}>Перейти к работам</Link>
                </NavLink>
              </div>

              <WorksGrid count={3} userId={work.userId}/>
            </div>
          </div>
        </div>}
    </div>
  );
};

export const WorkReader = memo(WorkReaderComponent);
