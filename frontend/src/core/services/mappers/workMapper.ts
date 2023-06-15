import { Work } from '../../models/work';
import { WorkDto } from '../../dtos/work-dto';

import { IMapperFromDto } from './mappers';
import { skillMapper } from './skillMapper';

/** User mapper. */
class WorkMapper implements IMapperFromDto<WorkDto, Work> {
  /** @inheritdoc */
  public fromDto(dto: WorkDto): Work {
    return {
      workId: dto.id,
      workName: dto.name,
      workIsLike: dto.is_like,
      workImageUrl: dto.image_url.length === 0 ? null : dto.image_url,
      workLikesCount: dto.likes_count,
      workMainSkills: dto.main_skills,
      workStartText: dto.start_text,
      userFirstName: dto.user_first_name,
      userId: dto.user_id,
      userImageUrl: dto.user_image_url,
      userLastName: dto.user_last_name,
    };
  }
}

export const workMapper = new WorkMapper();
