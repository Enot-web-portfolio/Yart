import {User} from 'src/core/models/user';

import {AxiosError} from 'axios';

import {UserDto} from '../../dtos/user-dto';
import {userMapper} from '../mappers/userMapper';
import {UserSecretStorageService} from '../user-secret-storage-service';
import {CONFIG} from '../config';
import {ShortUserDto} from '../../dtos/short-user-dto';
import {ShortUser} from '../../models/short-user';
import {shortUserMapper} from '../mappers/shortUserMapper';

import {http} from "../http";

export namespace UsersApi {

  /** Get mock user. */
  async function getMockUser(): Promise<UserDto> {
    const isUserSecretInStorage = await UserSecretStorageService.isValid();
    if (!isUserSecretInStorage) {
      throw new AxiosError<User>('Error', '400');
    }
    return new Promise(resolve => {
      const userDto: UserDto = {email: 'mockemail@gg.com', id: 1, name: 'Mock User'};
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
  export async function getUsers(page: number, count: number, onlySubscriptions: boolean, search?: string, mainSkills?: number[] | string[]): Promise<ShortUser[]> {
    const url = `${CONFIG.apiUrl}/users?page=${page}
    &count=${count}
    &only_subscriptions=${onlySubscriptions}
    ${search !== undefined ? `&search=${search}` : ''}
    ${mainSkills !== undefined ? `&main_skills=${mainSkills.join(', ')}` : ''}`;
    const {data: users} = await http.get<ShortUserDto[]>(url);

    return users.map(userDto => shortUserMapper.fromDto(userDto));
  }
}
