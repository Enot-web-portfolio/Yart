/** Short data about user. */
export type ShortUser = Readonly<{

  /** User id. */
  userId: number;

  /** User full name. */
  userFullName: string;

  /** Is subscribe. */
  isSubscribe: boolean;

  /** User's avatar url. */
  userImageUrl: string | null;

  /** Count of user's works. */
  worksCount: number;
}>;
