import { useEffect, useState } from 'react';

import { useSecondarySkillsStore } from '../../store/secondary-skills/store';
import { SecondarySkill } from '../../models/secondary-skill';

export const useSeparatedSecondarySkills = <T >(mapper: (skill: SecondarySkill) => T) => {
  const { secondarySkills, getSecondarySkills, error, isLoading } = useSecondarySkillsStore();
  const [separatedSkills, setSeparatedSkills] = useState<T[] | null>(null);

  useEffect(() => {
    if (secondarySkills === null && !isLoading && error === null) {
      getSecondarySkills();
    }
  }, []);

  useEffect(() => {
    if (secondarySkills === null) {
      return;
    }
    setSeparatedSkills(secondarySkills.map(skill => mapper(skill)));
  }, [secondarySkills]);

  return {
    secondarySkills: separatedSkills,
    setSecondarySkills: setSeparatedSkills,
    error,
    isLoading,
  };
};
