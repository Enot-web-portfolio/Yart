import { Skill } from '../../models/skill';

import { SkillDto } from '../../dtos/skill-dto';
import { skillMapper } from '../mappers/skillMapper';
import { CONFIG } from '../config';
import {http} from "../http";

export namespace SkillsApi {

  /** Get skills. */
  export async function getSkills(): Promise<Skill[]> {
    const {data: skills} = await http.get<SkillDto[]>(`${CONFIG.apiUrl}/skills/`);
    return skills.map(skillDto => skillMapper.fromDto(skillDto));
  }
}
