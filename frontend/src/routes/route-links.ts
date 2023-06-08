/** ABOUT. */
export const toAbout = () => '/about';

/** USERS. */

export const toUser = (id: number | string) => `/users/${id}`;
export const toUserWorks = (id: number | string) => `/users/${id}/works`;
export const toUserAbout = (id: number | string) => `/users/${id}/about`;
export const toUserSettings = (id: number | string) => `/users/${id}/settings`;
export const toUserSubscribe = (id: number | string) => `/users/${id}/subscribe`;
export const toUsers = () => '/users';

/** WORKS. */
export const toWorks = () => '/works';
export const toWorkEditor = () => '/works/editor';
