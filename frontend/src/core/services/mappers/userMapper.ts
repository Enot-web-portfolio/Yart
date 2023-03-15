import { User } from 'src/core/models/user';

import { UserDto } from '../../dtos/user-dto';

import { IMapperFromDto } from './mappers';

/** User mapper. */
class UserMapper implements IMapperFromDto<UserDto, User> {
  /** @inheritdoc */
  public fromDto(dto: UserDto): User {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
    };
  }
}

export const userMapper = new UserMapper();
