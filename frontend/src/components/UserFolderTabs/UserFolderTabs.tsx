import React, {FC, useEffect, useState} from 'react';
import {Spin, Tabs} from 'antd';

import {typedMemo} from '../../core/utils/typed-memo';
import {Tab} from 'rc-tabs/lib/interface';
import './UserFolderTabs.scss';
import {ShortUser} from '../../core/models/short-user';
import {UserCard} from '../UserCard';
import {UsersService} from "../../core/services/users-service";
import {EmptyResult} from "../EmptyResult";
import {ErrorResult} from "../ErrorResult";
import {AppError} from "../../core/models/app-error";
import {Skill} from "../../core/models/skill";
import {useSkillsStore} from "../../core/store/skills/store";

/** Компонент Табы пользователей по категориям. */
const UserFolderTabsComponents: FC = () => {
  /** Стор категорий. */
  const {defaultSkills, isLoading, getSkills} = useSkillsStore();
  /** Категории. */
  const [skills, setSkills] = useState<Tab[]>([]);
  /** Id активного скилла. */
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  /** Пользователи с выбранным скиллом. */
  const [users, setUsers] = useState<ShortUser[]>([]);

  /** Загружаются ли скиллы. */
  const [loadingSkills, setLoadingSkills] = useState(true);
  /** Загружаются ли пользователи. */
  const [loadingUsers, setLoadingUsers] = useState(true);
  /** Ошибка при загрузке скиллов/пользователей. */
  const [error, setError] = useState<null | AppError<Skill[] | ShortUser[]>>(null);

  useEffect(() => {
    if (defaultSkills === null && !isLoading) {
      getSkills()
    }
  }, []);

  useEffect(() => {
    if (defaultSkills !== null) {
      const parsedSkills: Tab[] = defaultSkills.map(skill => ({key: skill.id.toString(), label: skill.name}))
      setSkills(parsedSkills);
      setActiveSkill(parsedSkills[0].key);
      setLoadingSkills(false);
    }
  }, [defaultSkills])

  useEffect(() => {
    if (activeSkill !== null) {
      getUsers(activeSkill);
    }
  }, [activeSkill]);

  /**
   * Ф-ция получения пользователей.
   * @param selectedSkill - Выбранная категория.
   */
  const getUsers = async (selectedSkill: string) => {
    setLoadingUsers(true)
    setUsers([]);
    try {
      const newUsers = await UsersService.getUsers(1, 6, false, undefined, [selectedSkill]);
      setUsers(newUsers);
    } catch (error: unknown) {
      if (error instanceof AppError<ShortUser[]>)
        setError(error)
    }
    setLoadingUsers(false)
  };

  if (loadingSkills) return <Spin/>
  if (skills == null) {
    return <ErrorResult/>;
  }
  return (
    <div className={'folder-tabs'}>
      <Tabs type={'card'} items={skills} onChange={setActiveSkill}/>
      <div className={`folder-tabs__container ${users.length > 0 ? 'filled' : ''}`}>
        {loadingUsers ?
          <Spin/> :
          users.length > 0 ?
            users.map((user, i) => <UserCard {...user}
                                             classes={{
                                               container: 'folder-tabs__user-card',
                                               name: 'folder-tabs__user-card_name',
                                               works: 'folder-tabs__user-card_works',
                                               action: 'folder-tabs__user-card_action',
                                             }}
                                             key={i}/>)
            : <EmptyResult iconColor={'#fff'} className={'folder-tabs__empty'}/>}
      </div>
    </div>
  )
};

export const UserFolderTabs = typedMemo(UserFolderTabsComponents);
