import { Skill } from '../../models/skill';

import { SkillDto } from '../../dtos/skill-dto';
import { skillMapper } from '../mappers/skillMapper';
import { CONFIG } from '../config';
import { http } from '../http';
import { SecondarySkill } from '../../models/secondary-skill';
import { SecondarySkillDto } from '../../dtos/secondary-skill-dto';
import { secondarySkillMapper } from '../mappers/secondarySkillMapper';

export namespace SkillsApi {

  /** Get skills. */
  export async function getSkills(): Promise<Skill[]> {
    const { data: skills } = await http.get<SkillDto[]>(`${CONFIG.apiUrl}/skills/`);
    return skills.map(skillDto => skillMapper.fromDto(skillDto));
  }

  /** Get secondary skills. */
  export async function getSecondarySkills(): Promise<SecondarySkill[]> {
    const { data: skills } = await http.get<SecondarySkillDto[]>(`${CONFIG.apiUrl}/secondSkills/`);
    return skills.map(secondarySkillDto => secondarySkillMapper.fromDto(secondarySkillDto));
  }
}
