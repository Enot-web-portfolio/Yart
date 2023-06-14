import { EditingWorkDto } from '../../dtos/editing-work-dto';
import { EditingWork } from '../../models/editing-work';

import { IMapper } from './mappers';
import { workBlockMapper } from './workBlockMapper';

/** User mapper. */
class EditingWorkMapper implements IMapper<EditingWorkDto, EditingWork> {
  /** @inheritdoc */
  public fromDto(dto: EditingWorkDto): EditingWork {
    return {
      workBlock: dto.blocks.map(block => workBlockMapper.fromDto(block)),
      workName: dto.name,
      workFileUrls: dto.file_urls,
      workImageUrl: dto.image_url,
      workMainSkills: dto.main_skills,
      workTags: dto.tags,
      openComments: dto.open_comments,
    };
  }

  /** @inheritdoc */
  public toDto(model: EditingWork): EditingWorkDto {
    return {
      blocks: model.workBlock.map(block => workBlockMapper.toDto(block)),
      name: model.workName,
      file_urls: model.workFileUrls,
      image_url: model.workImageUrl,
      main_skills: model.workMainSkills,
      tags: model.workTags,
      open_comments: model.openComments,
    };
  }
}

export const editingWorkMapper = new EditingWorkMapper();
