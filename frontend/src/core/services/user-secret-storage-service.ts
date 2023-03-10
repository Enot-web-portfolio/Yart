import { UserSecret } from 'src/core/models/user-secret';

import { LocalStorageService } from './local-storage-service';

export namespace UserSecretStorageService {
  const USER_SECRET_KEY = 'USER_SECRET_KEY';

  /**
   * Saves a secret.
   * @param secret Secret to save.
   */
  export async function save(secret: UserSecret): Promise<void> {
    await LocalStorageService.save(USER_SECRET_KEY, secret);
  }

  /** Remove current secret. */
  export async function remove(): Promise<void> {
    await LocalStorageService.remove(USER_SECRET_KEY);
  }

  /** Get user secret. */
  export function get(): Promise<UserSecret | null> {
    return LocalStorageService.get<UserSecret>(USER_SECRET_KEY);
  }

  /** Is user secret saved. */
  export async function isValid(): Promise<boolean> {
    const secret = await get();
    return secret !== null;
  }
}
