import { CONFIG } from '../config';
import { http } from '../http';

export namespace FilesApi {

  /**
   * Upload avatar file.
   * @param file
   */
  export async function postAvatarFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.set('file', file);
    const { data } = await http.post<string>(`${CONFIG.apiUrl}/files/avatar/upload`, formData);
    return data;
  }

  /**
   * Upload work file.
   * @param file
   */
  export async function postWorkFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.set('file', file);
    const { data } = await http.post<string>(`${CONFIG.apiUrl}/files/work/upload`, formData);
    return data;
  }
}
