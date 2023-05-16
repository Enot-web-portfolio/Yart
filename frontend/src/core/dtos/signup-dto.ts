/** Values required to login. */
export type SignUpDto = Readonly<{

  /** Email. */
  email: string;

  /** Password. */
  password: string;

  /** User name. */
  first_name: string;

  /** User last name. */
  last_name: string;
}>;
