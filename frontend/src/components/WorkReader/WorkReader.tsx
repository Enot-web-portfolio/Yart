import React, { FC, memo } from 'react';

import { Button, Typography } from 'antd';

import { NavLink } from 'react-router-dom';

import { useWorkReaderStore } from '../../core/store/work-reader/store';

import { CrossIcon, HeartFillIcon } from '../Icons';

import { WorksGrid } from '../WorksGrid';

import { useSkillsStore } from '../../core/store/skills/store';

import { toUserWorks } from '../../routes/route-links';

import classes from './WorkReader.module.scss';
import { useWorkReaderState } from './useWorkReaderState';

const { Text, Link } = Typography;

const WorkReaderComponent: FC = () => {
  const workId = useWorkReaderStore(store => store.workId);
  const close = useWorkReaderStore(store => store.close);
  const { work } = useWorkReaderState(workId);
  const skills = useSkillsStore(store => store.defaultSkills);

  return (
    <div className={`${classes['work-reader__wrapper']} ${work ? classes.active : ''}`}>
      <div className={`${classes['work-reader__close']}`}>
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
                  <div className={`${classes['work-reader__header_author_dot']}`}/>
                  <Link className={`${classes['work-reader__header_author__subscribe']}`}>Подписаться</Link>
                </div>
              </div>

              <Button icon={<HeartFillIcon/>}>Нравится</Button>
            </div>
            {skills && <Text className={`${classes['work-reader__skills']}`}>
              {work.workMainSkills.reduce((prev, next) => {
                const curSkill = skills.find(skill => skill.id === next);
                return curSkill ? `${prev} ${curSkill.name}` : prev;
              }, '')}
            </Text>}

            <div className={`${classes['work-reader__content']}`} dangerouslySetInnerHTML={{ __html: '' }}/>

            <div className={`${classes['work-reader__author']}`}>
              <div className={`${classes['work-reader__author_image']}`}
                style={{ backgroundImage: `url('${work.userImageUrl}')` }}/>
              <Text className={`${classes['work-reader__author_name']}`}>{work.userFirstName} {work.userLastName}</Text>
              <Text className={`${classes['work-reader__author_skills']}`}>Skiils</Text>
              <Button type={'primary'}>Подписаться</Button>
            </div>

            <div className={`${classes['work-reader__author_work']}`}>
              <div className={`${classes['work-reader__author_work__header']}`}>
                <Text className={`${classes['work-reader__author_work__desc']}`}>Больше
                  от {work.userFirstName} {work.userLastName}</Text>
                <NavLink to={toUserWorks(work.userId)}>
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
