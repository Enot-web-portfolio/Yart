// See appError.ts to find out why this rule is disabled.
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityValidationErrors } from 'src/core/models/app-error';

import { ValidationErrorDto } from '../../dtos/validation-error-dto';

/** Mapper of DTO to domain model. */
export interface IMapperFromDto<TDto, TModel> {

  /** Maps from DTO to domain model. */
  fromDto(dto: TDto): TModel;
}

/** Mapper of domain model to DTO. */
export interface IMapperToDto<TDto, TModel> {

  /** Maps from domain model to DTO. */
  toDto(data: TModel): TDto;
}

/** Mapper from DTO to domain model and vice versa. */
export interface IMapper<TDto, TModel> extends
  IMapperFromDto<TDto, TModel>,
  IMapperToDto<TDto, TModel> { }

/** Mapper of errors of DTO to domain model errors. */
export interface ValidationErrorMapper<TDto extends Record<string, any>, TModel extends Record<string, any>> {

  /**
   * Maps validation error DTO to error for domain model.
   * @param errorDto Error DTO.
   */
  validationErrorFromDto(errorDto?: ValidationErrorDto<TDto> | null): EntityValidationErrors<TModel>;
}
