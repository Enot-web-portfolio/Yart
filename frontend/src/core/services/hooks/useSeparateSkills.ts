import {useEffect, useState} from 'react';
import {useSkillsStore} from "../../store/skills/store";
import {Skill} from "../../models/skill";

export const useSeparatedSkills = <T, >(mapper: (skill: Skill) => T) => {
  const {defaultSkills, getSkills, error, isLoading} = useSkillsStore();
  const [separatedSkills, setSeparatedSkills] = useState<T[] | null>(null)

  useEffect(() => {
    if (defaultSkills === null && !isLoading && error === null) {
      getSkills();
    }
  }, []);

  useEffect(() => {
    if (defaultSkills === null) {
      return;
    }
    setSeparatedSkills(defaultSkills.map(skill => mapper(skill)));
  }, [defaultSkills])

  return {
    skills: separatedSkills,
    setSkills: setSeparatedSkills,
    error,
    isLoading
  };
};
