import {SignUpDto} from "../../dtos/signup-dto";
import {SignUp} from "../../models/signup-data";

import { IMapperToDto} from './mappers';

/** Login mapper. */
class SignUpMapper implements IMapperToDto<SignUpDto, SignUp> {

  /** @inheritdoc */
  public toDto(data: SignUp): SignUpDto {
    return {
      email: data.email,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
    };
  }
}

export const signUpMapper = new SignUpMapper();
