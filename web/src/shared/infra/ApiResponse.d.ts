export type ApiResult<T, E = string> =
  | { isSuccess: true; data: T }
  | { isSuccess: false; error: E };
