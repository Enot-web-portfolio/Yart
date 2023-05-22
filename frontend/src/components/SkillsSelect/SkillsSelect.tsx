import React, { FC } from 'react';
import { typedMemo } from 'src/core/utils/typed-memo';
import { Spin, Typography } from 'antd';

import { ErrorResult } from '../ErrorResult';
import { useSeparatedSkills } from '../../core/services/hooks/useSeparateSkills';
import { Skill } from '../../core/models/skill';

import classes from './SkillsSelect.module.scss';

const { Text } = Typography;

type Props = Readonly<{

  /** Ф-ция изменения выбранных категорий. */
  onChange: (selectedIds: number[]) => void;
}>;

/**
 * Компонент Панель выбора категорий навыков (фильтр по категориям).
 * @param props
 */
const SkillsSelectComponent: FC<Props> = props => {
  /** Категории для выбора в панели. */
  const { skills, isLoading, error, setSkills } = useSeparatedSkills<Skill>(skill => skill);

  /**
   * Ф-ция выбора/развыбора категории.
   * @param skillId
   */
  const onToggle = (skillId: number) => {
    setSkills(curSkills => {
      const updatedSkills = (curSkills ?? []).map(skill => {
        const newSkill = { ...skill };
        if (newSkill.id === skillId) {
          newSkill.checked = !newSkill.checked;
        }
        return newSkill;
      });

      props.onChange(updatedSkills.filter(skill => skill.checked).map(skill => skill.id));
      return updatedSkills;
    });
  };

  if (isLoading) {
    return <Spin/>;
  }
  if (skills === null) {
    return <ErrorResult/>;
  }
  return (
    <div className={classes.category_select}>
      {skills.map((skill, i) =>
        <div className={`${classes.category_select__item} ${skill.checked ? classes.checked : ''}`}
          key={i}
          onClick={() => onToggle(skill.id)}
          style={{ backgroundColor: skill.checked ? skill.backgroundColor : undefined }}>
          <Text className={classes.category_select__item_name}
            style={{ color: skill.checked ? skill.fontColor : undefined }}>
            {skill.name}
          </Text>
        </div>)}
    </div>);
};

// Компонент Панель выбора категорий навыков (фильтро по категориям)
export const SkillsSelect = typedMemo(SkillsSelectComponent);
