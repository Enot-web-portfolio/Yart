import { Skill } from '../../models/skill';
import { SkillDto } from '../../dtos/skill-dto';

import { IMapper } from './mappers';

/** User mapper. */
class SkillMapper implements IMapper<SkillDto, Skill> {
  /** @inheritdoc */
  public fromDto(dto: SkillDto): Skill {
    return {
      id: dto.id,
      name: dto.name,
      backgroundColor: dto.background_color,
      fontColor: dto.font_color,
      checked: dto.checked,
    };
  }

  /** @inheritdoc */
  public toDto(model: Skill): SkillDto {
    return {
      id: model.id,
      name: model.name,
      background_color: model.backgroundColor,
      font_color: model.fontColor,
      checked: model.checked,
    };
  }
}

export const skillMapper = new SkillMapper();
