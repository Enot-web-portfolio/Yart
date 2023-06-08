import { User } from 'src/core/models/user';

import { UserDto } from '../../dtos/user-dto';
import { userMapper } from '../mappers/userMapper';
import { CONFIG } from '../config';
import { ShortUserDto } from '../../dtos/short-user-dto';
import { ShortUser } from '../../models/short-user';
import { shortUserMapper } from '../mappers/shortUserMapper';

import { http } from '../http';

export namespace UsersApi {

  let usersController = new AbortController();

  /** Get current user. */
  export async function getCurrentUser(): Promise<User> {
    const url = `${CONFIG.apiUrl}/users/me`;
    const { data } = await http.get<UserDto>(url);
    return userMapper.fromDto(data);
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
    usersController.abort();
    usersController = new AbortController();

    const url = `${CONFIG.apiUrl}/users?page=${page}
    &count=${count}
    &onlySubscriptions=${onlySubscriptions}
    ${search !== undefined ? `&search=${search}` : ''}
    ${mainSkills !== undefined && mainSkills.length > 0 ? `&mainSkills=${mainSkills.join(', ')}` : ''}`;
    const { data: users } = await http.get<ShortUserDto[]>(url, { signal: usersController.signal });

    return users.map(userDto => shortUserMapper.fromDto(userDto));
  }

  /**
   * Subscribe on user.
   * @param userId - Id пользователя, на которого подписываются.
   */
  export async function postSubscribe(userId: number | string) {
    const url = `${CONFIG.apiUrl}/users/${userId}/subscribe`;
    await http.post(url);
  }

  /**
   * Get current user.
   * @param id - Id user.
   */
  export async function getUser(id: string | number): Promise<User> {
    const url = `${CONFIG.apiUrl}/users/${id}`;
    const { data } = await http.get<UserDto>(url);
    return userMapper.fromDto(data);
  }
}
