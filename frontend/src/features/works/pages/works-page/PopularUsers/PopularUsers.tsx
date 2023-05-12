import React, { memo, FC, useState, useEffect } from 'react';

import { Typography } from 'antd';

import { Tab } from 'rc-tabs/lib/interface';

import { UserFolderTabs } from '../../../../../components/UserFolderTabs';

import { SkillsService } from '../../../../../core/services/skills-service';

import { UsersService } from '../../../../../core/services/users-service';

import { ShortUser } from '../../../../../core/models/short-user';

import classes from './PopularUsers.module.scss';

const { Text } = Typography;

// TODO: узнать, почему не ищутся пользователи с параметрами
const PopularUsersComponent: FC = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [users, setUsers] = useState<ShortUser[]>([]);

  // Категории
  const [skills, setSkills] = useState<Tab[]>([]);

  useEffect(() => {
    getSkills();
  }, []);

  useEffect(() => {
    if (activeSkill !== null) {
      getUsers(activeSkill);
    }
  }, [activeSkill]);

  /** Ф-ция получения категорий навыков. */
  const getSkills = async() => {
    const newSkills = await SkillsService.getSkills();
    const parsedSkills: Tab[] = newSkills.map(skill => ({ key: skill.id.toString(), label: skill.name }));
    setSkills(parsedSkills);
    setActiveSkill(parsedSkills[0].key);
  };

  /**
   * Ф-ция получения пользователей.
   * @param selectedSkill - Выбранная категория.
   */
  const getUsers = async(selectedSkill: string) => {
    const newUsers = await UsersService.getUsers(1, 6, false, undefined, [/* selectedSkill*/]);
    setUsers(newUsers);
  };

  if (skills == null) {
    return null;
  }
  return (
    <div className={`${classes['popular-users']}`}>
      <Text className={`${classes['popular-users__header']}`}>Популярные пользователи</Text>
      <UserFolderTabs users={users} items={skills} onChange={setActiveSkill}/>
    </div>
  );
};

export const PopularUsers = memo(PopularUsersComponent);
