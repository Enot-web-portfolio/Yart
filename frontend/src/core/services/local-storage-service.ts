/** Local storage service. */
export namespace LocalStorageService {

  /**
   * Save data in local storage.
   * @param key Key.
   * @param data Data.
   */
  export function save<T>(key: string, data: T): Promise<void> {
    return new Promise(resolve => {
      localStorage.setItem(key, JSON.stringify(data));
      resolve();
    });
  }

  /**
   * Get item.
   * @param key Key.
   */
  export function get<T = unknown>(key: string): Promise<T | null> {
    return new Promise(resolve => {
      const item = localStorage.getItem(key);
      if (item != null) {
        resolve(JSON.parse(item));
      }
      resolve(null);
    });
  }

  /**
   * Remove item from local storage.
   * @param key Key.
   */
  export function remove(key: string): Promise<void> {
    return new Promise(resolve => {
      localStorage.removeItem(key);
      resolve();
    });
  }
}
