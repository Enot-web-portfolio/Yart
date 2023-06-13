import {User} from 'src/core/models/user';

import {UserDto} from '../../dtos/user-dto';

import {IMapperFromDto} from './mappers';

/** User mapper. */
class UserMapper implements IMapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(dto: UserDto): User {
    return {
      userId: dto.id,
      userDescription: dto.description || null,
      userCity: dto.city || null,
      userEmail: dto.email,
      userCompany: dto.company || null,
      userAdditionalLinks: dto.additional_links,
      userPhone: dto.phone || null,
      userIsActive: dto.is_active,
      userFullName: `${dto.first_name} ${dto.last_name}`,
      userSelectedMainSkills: dto.selected_main_skills,
      userSubscribersCount: dto.subscribers_count,
      userImageUrl: dto.image_url || null,
      userSelectedSecondarySkills: dto.selected_secondary_skills,
      isSubscribe: dto.isSubscribe,
    };
  }
}

export const userMapper = new UserMapper();
