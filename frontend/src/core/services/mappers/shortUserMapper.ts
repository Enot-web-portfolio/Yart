import { ShortUser } from '../../models/short-user';

import { ShortUserDto } from '../../dtos/short-user-dto';

import { IMapperFromDto } from './mappers';

/** User mapper. */
class ShortUserMapper implements IMapperFromDto<ShortUserDto, ShortUser> {
  /** @inheritdoc */
  public fromDto(dto: ShortUserDto): ShortUser {
    return {
      userId: dto.id,
      userFullName: `${dto.first_name} ${dto.last_name}`,
      userImageUrl: dto.image_url,
      worksCount: dto.works_count,
      isSubscribe: dto.isSubscribe,
    };
  }
}

export const shortUserMapper = new ShortUserMapper();
