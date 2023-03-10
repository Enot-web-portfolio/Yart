// See appError.ts to find out why this rule is disabled.
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Validation error DTO.
 * If a property has primitive type (number, string), then errors - is an array of strings.
 * If a property is an object, then errors is an array of strings if property is null but required e.g.
 * Or is nested ValidationErrorDto<T> object.
 * If a property is an array, then errors is an object where key is name of property
 * and value is array of errors (index in this array corresponds to index of item in the original array).
 */
export type ValidationErrorDto<T extends Record<string, any>> = {
  [P in keyof T]?: T[P] extends readonly (infer K extends Record<string, unknown>)[]
    ? ValidationErrorDto<K>[]
    : T[P] extends Record<string, unknown>
      ? ValidationErrorDto<T[P]>
      : string[];
} & {

  /** Non field errors. */
  // eslint-disable-next-line no-restricted-syntax
  readonly non_field_errors?: string[];
};

/** Returned error with api. */
export interface ApiErrorDto<TDto extends Record<string, any>> {

  /** Validation data. May not be present in case the error is not related to provided data. */
  readonly data?: ValidationErrorDto<TDto>;

  /** Error detail error. */
  readonly detail?: string;
}
