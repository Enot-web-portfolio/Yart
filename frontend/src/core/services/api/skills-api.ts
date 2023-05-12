import { Skill } from '../../models/skill';

import { SkillDto } from '../../dtos/skill-dto';
import { skillMapper } from '../mappers/skillMapper';
import { CONFIG } from '../config';

export namespace SkillsApi {

  /** Get skills. */
  export async function getSkills(): Promise<Skill[]> {
    const response = await fetch(`${CONFIG.apiUrl}/skills/`);
    const skills: SkillDto[] = await response.json() ;

    return skills.map(skillDto => skillMapper.fromDto(skillDto));
  }
}
