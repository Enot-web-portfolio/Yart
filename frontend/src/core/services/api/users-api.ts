import { User } from 'src/core/models/user';

import { UserDto } from '../../dtos/user-dto';
import { userMapper } from '../mappers/userMapper';
import { CONFIG } from '../config';
import { ShortUserDto } from '../../dtos/short-user-dto';
import { ShortUser } from '../../models/short-user';
import { shortUserMapper } from '../mappers/shortUserMapper';

import { http } from '../http';
import { EditorUserDto } from '../../dtos/editor-user-dto';
import { EditorUser } from '../../models/editor-user';
import { editorUserMapper } from '../mappers/editorUserMapper';

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

    const url = `${CONFIG.apiUrl}/users?page=${page}&count=${count}&onlySubscriptions=${onlySubscriptions}${search !== undefined && search.length > 0 ? `&search=${search}` : ''}${mainSkills !== undefined && mainSkills.length > 0 ? `&mainSkills=${mainSkills.join(', ')}` : ''}`;
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
   * Activation email resend.
   * @param email - Почта для подтверждения.
   */
  export async function postActivationResend(email: string) {
    const url = `${CONFIG.apiUrl}/activation/resend-activation/`;
    await http.post(url, { email });
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

  /**
   * Get editor user.
   * @param id - Id user.
   */
  export async function getUserEdit(id: string | number): Promise<EditorUser> {
    const url = `${CONFIG.apiUrl}/users/${id}/edit`;
    const { data } = await http.get<EditorUserDto>(url);
    return editorUserMapper.fromDto(data);
  }

  /**
   * Post user edit.
   * @param id - Id user.
   * @param user
   */
  export async function postUserEdit(id: string | number, user: EditorUser) {
    const url = `${CONFIG.apiUrl}/users/${id}/edit`;
    await http.post<EditorUserDto>(url, editorUserMapper.toDto(user));
  }

  /** Unubscribe on user.
   * @param userId - Id пользователя, от которого отписываются.
   */
  export async function postUnsubscribe(userId: number | string) {
    const url = `${CONFIG.apiUrl}/users/${userId}/unsubscribe`;
    await http.post(url);
  }
}
