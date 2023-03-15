import { User } from 'src/core/models/user';

import { AxiosError } from 'axios';

import { UserDto } from '../../dtos/user-dto';
import { userMapper } from '../mappers/userMapper';
import { UserSecretStorageService } from '../user-secret-storage-service';

// TODO (template preparation): This service was made for template. Remove it from your project.
export namespace UserApi {

  /** Get mock user. */
  async function getMockUser(): Promise<UserDto> {
    const isUserSecretInStorage = await UserSecretStorageService.isValid();
    if (!isUserSecretInStorage) {
      throw new AxiosError<User>('Error', '400');
    }
    return new Promise(resolve => {
      const userDto: UserDto = { email: 'mockemail@gg.com', id: 1, name: 'Mock User' };
      resolve(userDto);
   });
  }

  /** Get current user. */
  export async function getCurrentUser(): Promise<User> {
    const userDto = await getMockUser();
    return userMapper.fromDto(userDto);
  }
}
