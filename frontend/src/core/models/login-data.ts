/** Values required to login. */
export type Login = Readonly<{

  /** Email. */
  email: string;

  /** Password. */
  password: string;
}>;

/** Values required to login. */
export type LoginErrors = Readonly<{

  /** Email. */
  email?: string[];

  /** Password. */
  password?: string[];

  /** Detail. */
  detail?: string[];
}>;
