/** User DTO. */
export type UserDto = Readonly<{

  /** Id. */
  id: number;

  /** First Name. */
  first_name: string;

  /** Last name. */
  last_name: string;

  /** Email. */
  email: string;

  /** Phone. */
  phone: number;

  /** Additional links. */
  additional_links: string[];

  /** City. */
  city: string;

  /** Company. */
  company: string

  /** Image url. */
  image_url: string;

  /** Count of subscribe. */
  subscribers_count: number;

  /** Selected main skills. */
  selected_main_skills: string[];

  /** Selected secondary skills. */
  selected_secondary_skills: string[];

  /** Description user. */
  description: string;

  /** Is active mail. */
  is_active: boolean;
}>
