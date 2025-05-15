import { z } from 'zod';

export type Result<T, E = unknown> = { success: true; data: T } | { success: false; error: E };

export const success = <T>(schema: T) => ({
  isSuccess: true,
  data: schema,
});

export const failure = (error: string) => ({
  isSuccess: false,
  error: error,
});
