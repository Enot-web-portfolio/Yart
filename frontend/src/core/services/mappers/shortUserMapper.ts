import { ShortUser } from '../../models/short-user';

import { ShortUserDto } from '../../dtos/short-user-dto';

import { IMapperFromDto } from './mappers';

/** User mapper. */
class ShortUserMapper implements IMapperFromDto<ShortUserDto, ShortUser> {
  /** @inheritdoc */
  public fromDto(dto: ShortUserDto): ShortUser {
    return {
      userId: dto.id,
      userFullName: `${dto.user_first_name} ${dto.user_last_name}`,
      userImageUrl: dto.user_image_url,
      worksCount: dto.works_count,
    };
  }
}

export const shortUserMapper = new ShortUserMapper();
