/** Short data about user. */
export type ShortUserDto = Readonly<{

  /** User id. */
  id: number;

  /** User first name. */
  user_first_name: string;

  /** User's avatar url. */
  user_image_url: string | null;

  /** User's lastname. */
  user_last_name: string;

  /** Count of user's works. */
  works_count: number;
}>;
