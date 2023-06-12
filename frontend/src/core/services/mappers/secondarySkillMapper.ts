import { SecondarySkill } from '../../models/secondary-skill';
import { SecondarySkillDto } from '../../dtos/secondary-skill-dto';

import { IMapperFromDto } from './mappers';

/** User mapper. */
class SecondarySkillMapper implements IMapperFromDto<SecondarySkillDto, SecondarySkill> {
  /** @inheritdoc */
  public fromDto(dto: SecondarySkillDto): SecondarySkill {
    return {
      id: dto.id,
      name: dto.name,
      checked: dto.checked,
    };
  }
}

export const secondarySkillMapper = new SecondarySkillMapper();
