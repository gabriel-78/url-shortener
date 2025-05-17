import { LinkEntity } from '@/domain/link/entity';
import { GetLinkResponse } from '@/services/links/schemas/responses/getLink';

export function toGetLinkResponse(entity: LinkEntity): GetLinkResponse {
  return {
    abreviatedUrl: entity.shortenerUrl.getValue(),
    accessQuantity: entity.accessQuantity,
    id: entity.id,
    url: entity.originalUrl.getValue(),
  } as GetLinkResponse;
}
