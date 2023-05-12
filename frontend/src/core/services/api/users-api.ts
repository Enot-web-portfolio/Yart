import { User } from 'src/core/models/user';

import { AxiosError } from 'axios';

import { UserDto } from '../../dtos/user-dto';
import { userMapper } from '../mappers/userMapper';
import { UserSecretStorageService } from '../user-secret-storage-service';
import { CONFIG } from '../config';
import { ShortUserDto } from '../../dtos/short-user-dto';
import { ShortUser } from '../../models/short-user';
import { shortUserMapper } from '../mappers/shortUserMapper';

// TODO (template preparation): This service was made for template. Remove it from your project.
export namespace UsersApi {

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

  /**
   * Get users.
   * @param page - Номер страницы.
   * @param count - Кол-во элементов на странице.
   * @param onlySubscriptions - Только подписчики.
   * @param search - Значение в поиске.
   * @param mainSkills - Выбранные категории.
   */
  export async function getUsers(page?: number, count?: number, onlySubscriptions?: boolean, search?: string, mainSkills?: number[] | string[]): Promise<ShortUser[]> {
    const url = `${CONFIG.apiUrl}/users?page=${page}&count=${count}&only_subscriptions=${onlySubscriptions}
    &search=${search}&main_shills=${mainSkills?.join(', ')}`;
    const response = await fetch(url);
    const users: ShortUserDto[] = await response.json();

    return users.map(userDto => shortUserMapper.fromDto(userDto));
  }
}
