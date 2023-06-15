import { WorkBlockDto } from '../../dtos/work-block-dto';
import { WorkBlock } from '../../models/work-block';

import { IMapper } from './mappers';

/** User mapper. */
class WorkBlockMapper implements IMapper<WorkBlockDto, WorkBlock> {
  /** @inheritdoc */
  public fromDto(dto: WorkBlockDto): WorkBlock {
    return {
      blockImageUrls: dto.image_urls,
      blockOrder: dto.order,
      blockText: dto.text,
      blockType: dto.type,
    };
  }

  /** @inheritdoc */
  public toDto(model: WorkBlock): WorkBlockDto {
    return {
      image_urls: model.blockImageUrls,
      order: model.blockOrder,
      text: model.blockText,
      type: model.blockType,
    };
  }
}

export const workBlockMapper = new WorkBlockMapper();
