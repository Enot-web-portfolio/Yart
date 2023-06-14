import { CONFIG } from '../config';
import { http } from '../http';

export namespace ActivateApi {

  /**
   * Activate mail.
   * @param uid - User id.
   * @param token - Token activate.
   */
  export async function postActivate(uid: string, token: string) {
    await http.post(`${CONFIG.apiUrl}/activation/${uid}/${token}/`, { uid, token });
  }
}
