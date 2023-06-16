import { Work } from '../../models/work';
import { WorkDto } from '../../dtos/work-dto';
import { workMapper } from '../mappers/workMapper';
import { CONFIG } from '../config';
import { http } from '../http';
import { EditingWorkDto } from '../../dtos/editing-work-dto';
import { EditingWork } from '../../models/editing-work';
import { editingWorkMapper } from '../mappers/editingWorkMapper';

export namespace WorksApi {

  /**
   * Get works.
   * @param page - Текущая страница работ.
   * @param count - Кол-во работ на странице.
   * @param onlySubscriptions - Работы только людей, на которых подписан.
   * @param userId - Работы пользователя с данным id.
   * @param mainSkills - Выбранные категории.
   */
  export async function getWorks(page: number, count: number, onlySubscriptions: boolean, userId?: number | string, mainSkills?: number[] | string[]): Promise<Work[]> {
    const url = `${CONFIG.apiUrl}/works?page=${page}&count=${count}&only_subscriptions=${onlySubscriptions}${userId !== undefined ? `&user_id=${userId}` : ''}${mainSkills !== undefined ? `&main_skills=${mainSkills.join(', ')}` : ''}`;
    const { data: works } = await http.get<WorkDto[]>(url);

    return works.map(workDto => workMapper.fromDto(workDto));
  }

  /**
   * Like work.
   * @param workId - Id работы.
   * @param userId - Id пользователя, который лайкает.
   */
  export async function postWorkLike(workId: number, userId: number) {
    await http.post(`${CONFIG.apiUrl}/works/${workId}/${userId}/like/`);
  }

  /**
   * Unlike work.
   * @param workId - Id работы.
   * @param userId - Id пользователя, который убирает лайк.
   */
  export async function postWorkUnlike(workId: number, userId: number) {
    await http.post(`${CONFIG.apiUrl}/works/${workId}/${userId}/unlike/`);
  }

  /** Get create work.*/
  export async function getWorkCreate(): Promise<EditingWork> {
    const { data } = await http.get<EditingWorkDto>(`${CONFIG.apiUrl}/works/create`);
    return editingWorkMapper.fromDto(data);
  }

  /**
   * Post create work.
   * @param work - Editing work data.
   */
  export async function postWorkCreate(work: EditingWork): Promise<number | string> {
    const { data } = await http.post<WorkDto>(`${CONFIG.apiUrl}/works/create`, editingWorkMapper.toDto(work));
    return data.id;
  }

  /**
   * Get edit work.
   * @param id - Work id.
   */
  export async function getWorkEdit(id: number | string): Promise<EditingWork> {
    const { data } = await http.get<EditingWorkDto>(`${CONFIG.apiUrl}/works/${id}/edit`);
    return editingWorkMapper.fromDto(data);
  }

  /**
   * Post edit work.
   * @param work - Editing work data.
   * @param id - Work id.
   */
  export async function putWorkEdit(work: EditingWork, id: number | string) {
    await http.put(`${CONFIG.apiUrl}/works/${id}/edit`, editingWorkMapper.toDto(work));
  }
}
