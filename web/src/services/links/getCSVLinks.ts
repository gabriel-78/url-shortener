import { AxiosError } from 'axios';
import { apiClient } from '../../shared/infra/apiClient';
import { ApiResult } from '../../shared/infra/ApiResponse';
import { Result } from '../../shared/utils/result';
import { GetCSVLinksResponse } from './LinksApiResponse';

export async function getCSVLinks(): Promise<Result<GetCSVLinksResponse>> {
  try {
    const response = await apiClient.get<ApiResult<GetCSVLinksResponse>>(`/links-by-csv`);

    if (response.data.isSuccess) return Result.success<GetCSVLinksResponse>(response.data.data);
    else return Result.failure(response.data.error);
  } catch (err) {
    const error = err as AxiosError<string>;

    return Result.failure(error.message ?? 'Erro ao requisitar o arquivo csv');
  }
}
