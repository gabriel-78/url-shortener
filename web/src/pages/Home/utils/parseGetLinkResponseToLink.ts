import { GetLinkResponse } from '../../../services/links/LinksApiResponse';
import type { Link } from '../types';

export const parseGetLinkResponseToLink = (value: GetLinkResponse): Link => {
  return {
    accessQuantity: value.accessQuantity,
    id: value.id,
    originalUrl: value.url,
    shortenerlUrl: value.abreviatedUrl,
  };
};
