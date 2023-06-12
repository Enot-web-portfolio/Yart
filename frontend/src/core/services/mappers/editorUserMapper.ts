import {User} from 'src/core/models/user';

import {UserDto} from '../../dtos/user-dto';

import {IMapper, IMapperFromDto} from './mappers';
import {EditorUserDto} from "../../dtos/editor-user-dto";
import {EditorUser} from "../../models/editor-user";

/** User mapper. */
class EditorUserMapper implements IMapper<EditorUserDto, EditorUser> {
  /** @inheritdoc */
  public fromDto(dto: EditorUserDto): EditorUser {
    return {
      userId: dto.id,
      userDescription: dto.description || null,
      userCity: dto.city || null,
      userEmail: dto.email,
      userCompany: dto.company || null,
      userAdditionalLinks: dto.additional_links,
      userPhone: dto.phone || null,
      userIsActive: dto.is_active,
      userFirstName: dto.first_name,
      userLastName: dto.last_name,
      userSelectedMainSkills: dto.selected_main_skills,
      userImageUrl: dto.image_url || null,
      userSelectedSecondarySkills: dto.selected_secondary_skills,
    };
  }

  /** @inheritdoc */
  public toDto(model: EditorUser): EditorUserDto {
    return {
      id: model.userId,
      description: model.userDescription ?? '',
      city: model.userCity ?? '',
      email: model.userEmail,
      company: model.userCompany ?? '',
      additional_links: model.userAdditionalLinks,
      phone: model.userPhone ?? '',
      is_active: model.userIsActive,
      first_name: model.userFirstName,
      last_name: model.userLastName,
      selected_main_skills: model.userSelectedMainSkills,
      image_url: model.userImageUrl ?? '',
      selected_secondary_skills: model.userSelectedSecondarySkills,
    };
  }
}

export const editorUserMapper = new EditorUserMapper();
