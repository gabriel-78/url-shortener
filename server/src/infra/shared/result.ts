import { z } from 'zod';

export type Result<T, E = unknown> = { success: true; data: T } | { success: false; error: E };

export const success = <T>(schema: T) => ({
  success: true,
  data: schema,
});

export const failure = (error: string) => ({
  success: false,
  error: error,
});
