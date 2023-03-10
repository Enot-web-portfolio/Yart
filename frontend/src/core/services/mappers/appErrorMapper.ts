// See appError.ts to find out why this rule is disabled.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { AppError } from 'src/core/models/app-error';

import { ApiErrorDto } from '../../dtos/validation-error-dto';

import { ValidationErrorMapper } from './mappers';

/**
 * Error mapper type declaration.
 * Could be a simple function to transform errors from DTO to errors of domain model
 * or implementation of IMapper with implemented validationErrorFromDto method.
 */
export type ErrorMapper<TDto extends Record<string, unknown>, TEntity extends Record<string, unknown>> =
  | ValidationErrorMapper<TDto, TEntity>
  | ValidationErrorMapper<TDto, TEntity>['validationErrorFromDto'];

/** App error mapper. */
export class AppErrorMapper {
  /**
   * Converts default HttpErrorResponse object to custom application error.
   * @param httpError Http error response.
   */
  public static fromDto(httpError: AxiosError): AppError {
    const { message } = httpError;
    return new AppError(message);
  }

  /**
   * Maps HTTP API error response to the appropriate API error model.
   * @param httpError HTTP error.
   * @param mapper Mapper function that transform validation DTO errors to the application validation model.
   * @returns AppError if httpError is not "Bad Request" error or AppValidationError if it is "Bad Request".
   */
  public static fromDtoWithValidationSupport<
    TErrorDto extends Record<string, any>,
    TEntity extends Record<string, any>,
  >(
    httpError: AxiosError<ApiErrorDto<TErrorDto>>,
    mapper: ErrorMapper<TErrorDto, TEntity>,
  ): AppError<TEntity> {
    if (httpError.response?.status !== 400) {
      // It is not a validation error. Return simple AppError.
      return this.fromDto(httpError);
    }

    if (typeof mapper !== 'function' && mapper.validationErrorFromDto == null) {
      throw new Error('Provided mapper does not have implementation of validationErrorFromDto');
    }

    // TODO (template preparation):
    // Check that API sends you an error with the same field (detail, data, etc.) and change it if it's needed.

    const { data: error, detail } = httpError.response.data;

    if (error == null) {
      return this.fromDto(httpError);
    }

    const validationData = typeof mapper === 'function' ?
      mapper(error) :
      mapper.validationErrorFromDto(error);

    return new AppError<TEntity>(detail ?? '', validationData);
  }
}
