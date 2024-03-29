/** User. */
export type User = Readonly<{

  /** Id. */
  userId: number;

  /** Full Name. */
  userFullName: string;

  /** Is subscribe. */
  isSubscribe?: boolean;

  /** Email. */
  userEmail: string;

  /** Phone. */
  userPhone: number | null;

  /** Additional links. */
  userAdditionalLinks: string[];

  /** City. */
  userCity: string | null;

  /** Company. */
  userCompany: string | null;

  /** Image url. */
  userImageUrl: string | null;

  /** Count of subscribe. */
  userSubscribersCount: number;

  /** Selected main skills. */
  userSelectedMainSkills: number[];

  /** Selected secondary skills. */
  userSelectedSecondarySkills: number[];

  /** Description user. */
  userDescription: string | null;

  /** Is active mail. */
  userIsActive?: boolean;
}>;
