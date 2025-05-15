import { AxiosError } from 'axios';
import { apiClient } from '../../shared/infra/apiClient';
import { ApiResult } from '../../shared/infra/ApiResponse';
import { Result } from '../../shared/utils/result';

export async function deleteLink(id: string): Promise<Result<undefined>> {
  try {
    const response = await apiClient.delete<ApiResult<undefined>>(`/links/${id}`);

    if (response.data.isSuccess) return Result.success<undefined>(response.data.data);
    else return Result.failure(response.data.error);
  } catch (err) {
    const error = err as AxiosError<string>;

    return Result.failure(error.message ?? 'Erro ao excluir o link');
  }
}
