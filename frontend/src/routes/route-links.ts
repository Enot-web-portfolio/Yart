/** ABOUT. */
export const toAbout = () => '/about';

/** USERS. */

export const toUser = (id: number) => `/users/${id}`;
export const toUserWorks = (id: number) => `/users/${id}/works`;
export const toUserAbout = (id: number) => `/users/${id}/about`;
export const toUserSettings = (id: number) => `/users/${id}/settings`;
export const toUserSubscribe = (id: number) => `/users/${id}/subscribe`;
export const toUsers = () => '/users';

/** WORKS. */
export const toWorks = () => '/works';
export const toWorkEditor = () => '/works/editor';
