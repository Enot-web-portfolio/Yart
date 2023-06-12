/** User DTO. */
export type EditorUserDto = Readonly<{

  /** Id. */
  id: number;

  /** Full Name. */
  first_name: string;

  /** Last name. */
  last_name: string;

  /** Email. */
  email: string;

  /** Phone. */
  phone: string;

  /** Additional links. */
  additional_links: string[];

  /** City. */
  city: string;

  /** Company. */
  company: string

  /** Image url. */
  image_url: string;

  /** Selected main skills. */
  selected_main_skills: number[];

  /** Selected secondary skills. */
  selected_secondary_skills: number[];

  /** Description user. */
  description: string;

  /** Is active mail. */
  is_active?: boolean;
}>
