import React, {FC} from 'react';
import {typedMemo} from 'src/core/utils/typed-memo';
import {Spin, Typography} from 'antd';
import classes from './SkillsSelect.module.scss';
import {ErrorResult} from "../ErrorResult";
import {useSeparatedSkills} from "../../core/services/hooks/useSeparateSkills";
import {Skill} from "../../core/models/skill";

const {Text} = Typography;

type Props = Readonly<{

  /** Ф-ция изменения выбранных категорий. */
  onChange: (selectedIds: number[]) => void;
}>;

/** Компонент Панель выбора категорий навыков (фильтр по категориям). */
const SkillsSelectComponent: FC<Props> = props => {
  /** Категории для выбора в панели. */
  const {skills, isLoading, error, setSkills} = useSeparatedSkills<Skill>((skill) => skill);

  /** Ф-ция выбора/развыбора категории. */
  const onToggle = (skillId: number) => {
    setSkills(skills => {
      const updatedSkills = (skills || []).map(skill => {
        if (skill.id == skillId) {
          skill.checked = !skill.checked;
        }
        return skill;
      })

      props.onChange(updatedSkills.filter(skill => skill.checked).map(skill => skill.id));
      return updatedSkills;
    });
  };

  if (isLoading) return <Spin/>;
  if (skills === null) return <ErrorResult/>;
  return (
    <div className={classes.category_select}>
      {skills.map((skill, i) =>
        <div className={`${classes.category_select__item} ${skill.checked ? classes.checked : ''}`}
             key={i}
             onClick={() => onToggle(skill.id)}
             style={{backgroundColor: skill.checked ? skill.backgroundColor : undefined}}>
          <Text className={classes.category_select__item_name}
                style={{color: skill.checked ? skill.fontColor : undefined}}>
            {skill.name}
          </Text>
        </div>)}
    </div>);
};

// Компонент Панель выбора категорий навыков (фильтро по категориям)
export const SkillsSelect = typedMemo(SkillsSelectComponent);
