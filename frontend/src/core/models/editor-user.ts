/** User. */
export type EditorUser = Readonly<{

  /** Id. */
  userId: number;

  /** First Name. */
  userFirstName: string;

  /** Last Name. */
  userLastName: string;

  /** Email. */
  userEmail: string;

  /** Phone. */
  userPhone: string | null;

  /** Additional links. */
  userAdditionalLinks: string[];

  /** City. */
  userCity: string | null;

  /** Company. */
  userCompany: string | null;

  /** Image url. */
  userImageUrl: string | null;

  /** Selected main skills. */
  userSelectedMainSkills: number[];

  /** Selected secondary skills. */
  userSelectedSecondarySkills: number[];

  /** Description user. */
  userDescription: string | null;

  /** Is active mail. */
  userIsActive?: boolean;
}>;
