/** Short data about user. */
export type ShortUserDto = Readonly<{

  /** User id. */
  id: number;

  /** User first name. */
  first_name: string;

  /** User's avatar url. */
  image_url: string | null;

  /** User's lastname. */
  last_name: string;

  /** Count of user's works. */
  works_count: number;
}>;
