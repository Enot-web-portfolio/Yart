import { Work } from '../../models/work';
import { WorkDto } from '../../dtos/work-dto';
import { workMapper } from '../mappers/workMapper';
import { CONFIG } from '../config';

export namespace WorksApi {

  /**
   * Get works.
   * @param page - Текущая страница работ.
   * @param count - Кол-во работ на странице.
   * @param onlySubscriptions - Работы только людей, на которых подписан.
   * @param userId - Работы пользователя с данным id.
   */
  export async function getWorks(page: number, count: number, onlySubscriptions: boolean, userId?: number): Promise<Work[]> {
    const response = await fetch(`${CONFIG.apiUrl}/works?page=${page}&count=${count}&only_subscriptions=${onlySubscriptions}&user_id=${userId}`);
    const works: WorkDto[] = await response.json();

    return works.map(workDto => workMapper.fromDto(workDto));
  }

  /**
   * Like work.
   * @param workId - Id работы.
   * @param userId - Id пользователя, который лайкает.
   */
  export async function postWorkLike(workId: number, userId: number) {
    await fetch(`${CONFIG.apiUrl}/works/${workId}/${userId}/like/`);
  }

  /**
   * Unlike work.
   * @param workId - Id работы.
   * @param userId - Id пользователя, который убирает лайк.
   */
  export async function postWorkUnlike(workId: number, userId: number) {
    await fetch(`${CONFIG.apiUrl}/works/${workId}/${userId}/unlike/`);
  }
}
