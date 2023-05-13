import React, {FC, useState, useEffect} from 'react';

import {typedMemo} from 'src/core/utils/typed-memo';
import {Skill} from 'src/core/models/skill';
import {Result, Spin, Typography} from 'antd';

import {SkillsService} from '../../core/services/skills-service';

import classes from './SkillsSelect.module.scss';
import {ErrorResult} from "../ErrorResult";
import {useSkillsStore} from "../../core/store/skills/store";

const {Text} = Typography;

type Props = Readonly<{

  /** Ф-ция изменения выбранных категорий. */
  onChange: (selectedIds: number[]) => void;
}>;

/** Компонент Панель выбора категорий навыков (фильтр по категориям). */
const SkillsSelectComponent: FC<Props> = props => {
  /** Стор категорий. */
  const {defaultSkills, isLoading, getSkills} = useSkillsStore();
  /** Категории для выбора в панели. */
  const [skills, setSkills] = useState<Skill[]>([]);
  /** Загружаются ли скиллы. */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (defaultSkills === null && !isLoading) {
      getSkills();
    }
  }, []);

  useEffect(() => {
    if (defaultSkills !== null) {
      setSkills(defaultSkills);
      setLoading(false)
    }
  }, [defaultSkills])

  /** Ф-ция выбора/развыбора категории. */
  const onToggle = (skillId: number) => {
    const newSkills = [...skills];
    const toggleSkillIndex = newSkills.findIndex(skill => skill.id === skillId);

    if (toggleSkillIndex > -1) {
      newSkills[toggleSkillIndex].checked = !newSkills[toggleSkillIndex].checked;
    }

    setSkills(newSkills);
    props.onChange(newSkills.filter(skill => skill.checked).map(skill => skill.id));
  };

  if (loading) return <Spin/>
  if (skills == null) return <ErrorResult/>
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
