import { AxiosError } from 'axios';
import { apiClient } from '../../shared/infra/apiClient';
import { Link } from './link';

export async function getAllLinks(): Promise<Link[]> {
  try {
    // const response = await apiClient().get<Link[]>('/links');
    const response = await apiClient.get<Link[]>('/links');

    return response.data;
  } catch (err) {
    const error = err as AxiosError<string>;

    return error.message;
  }
}

export async function deleteLink(id: string): Promise<undefined> {
  try {
    const response = await apiClient.delete<undefined>(`/links/${id}`);

    return response.data;
  } catch (err) {
    const error = err as AxiosError<string>;

    return error.message;
  }
}
