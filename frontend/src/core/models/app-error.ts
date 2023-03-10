// In some cases we have to use Record<string, any> to narrow generic type.
// It's not possible to use 'unknown' because Record<string, unknown> doesn't work with interfaces and classes.
// That's why we have to use 'any' instead.
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Entity validation errors type.
 * Describes validation items for target entity.
 */
export type EntityValidationErrors<T extends Record<string, any>> = {

  /** Error message for certain entity property. */
  [P in keyof T]?: PropValidationMessage<T[P]>;
};

/**
 * Validation message type for specific property type.
 * Could be a just error message for simple field or nested validation error for composite fields.
 */
type PropValidationMessage<T> =
  T extends readonly (infer K extends Record<string, unknown>)[]
    ? EntityValidationErrors<K>[]
    : T extends Record<string, unknown>
      ? EntityValidationErrors<T>
      : string;

/** Common application error. */
export class AppError<TEntity extends Record<string, any> = never> extends Error {

  /** Error message. */
  public override readonly message: string;

  /** Validation errors for entity fields. */
  public readonly validationData?: EntityValidationErrors<TEntity>;

  public constructor(message: string, validationData?: EntityValidationErrors<TEntity>) {
    super(message);
    this.message = message;
    this.validationData = validationData;
  }
}
