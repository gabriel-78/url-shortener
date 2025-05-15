import { AxiosError } from 'axios';
import { apiClient } from '../../shared/infra/apiClient';
import { ApiResult } from '../../shared/infra/ApiResponse';
import { Result } from '../../shared/utils/result';
import { GetLinkResponse } from './LinksApiResponse';

export async function accessLink(id: string): Promise<Result<GetLinkResponse>> {
  try {
    const response = await apiClient.post<ApiResult<GetLinkResponse>>(`/links/${id}/access`);

    if (response.data.isSuccess) return Result.success<GetLinkResponse>(response.data.data);
    else return Result.failure(response.data.error);
  } catch (err) {
    const error = err as AxiosError<string>;

    return Result.failure(error.message ?? 'Erro ao requisitar o acesso ao link');
  }
}
