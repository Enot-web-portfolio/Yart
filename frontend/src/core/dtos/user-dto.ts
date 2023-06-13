/** User DTO. */
export type UserDto = Readonly<{

  /** Id. */
  id: number;

  /** Full Name. */
  first_name: string;

  /** Is subscribe. */
  isSubscribe?: boolean;

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
  selected_main_skills: number[];

  /** Selected secondary skills. */
  selected_secondary_skills: number[];

  /** Description user. */
  description: string;

  /** Is active mail. */
  is_active?: boolean;
}>
