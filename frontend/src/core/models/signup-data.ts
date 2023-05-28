/** Values required to login. */
export type SignUp = Readonly<{

  /** Email. */
  email: string;

  /** Password. */
  password: string;

  /** Repeated password. */
  repeatedPassword: string;

  /** User name. */
  firstName: string;

  /** User last name. */
  lastName: string;
}>;

/** Values required to login. */
export type SignUpErrors = Readonly<{

  /** Email. */
  email?: string[];

  /** Password. */
  password?: string[];

  /** Detail/ */
  detail?: string;
}>;
