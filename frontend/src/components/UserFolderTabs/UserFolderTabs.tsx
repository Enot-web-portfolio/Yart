import React, {FC, useState} from 'react';
import {Spin, Tabs} from 'antd';
import {typedMemo} from '../../core/utils/typed-memo';
import {Tab} from 'rc-tabs/lib/interface';
import './UserFolderTabs.scss';
import {UserCard} from '../UserCard';
import {EmptyResult} from "../EmptyResult";
import {ErrorResult} from "../ErrorResult";
import {Skill} from "../../core/models/skill";
import {useSeparatedSkills} from "../../core/services/hooks/useSeparateSkills";
import {useStateShortUsers} from "../../core/services/hooks/useUsersBySkills";

/** Компонент Табы пользователей по категориям. */
const UserFolderTabsComponents: FC = () => {
  /** Категории. */
  const {skills, isLoading: isLoadingSkills, error: errorSkills} = useSeparatedSkills(mapSkillToTab)
  /** Id активного скилла. */
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  /** Пользователи с выбранным скиллом. */
  const {users, error: errorUsers, isLoading: isLoadingUsers} = useStateShortUsers(activeSkill);

  /** Ф-ция маппинга Skill в Tab. */
  function mapSkillToTab(skill: Skill): Tab {
    return {key: skill.id.toString(), label: skill.name}
  }

  if (isLoadingSkills) return <Spin/>;
  if (skills === null || errorSkills) return <ErrorResult/>;
  return (
    <div className={'folder-tabs'}>
      <Tabs type={'card'} items={skills} onChange={setActiveSkill}/>
      <div className={`folder-tabs__container ${users && users.length > 0 ? 'filled' : ''}`}>
        {isLoadingUsers ?
          <Spin/> :
          users && users.length > 0 ?
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
