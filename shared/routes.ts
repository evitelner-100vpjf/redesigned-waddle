import { z } from 'zod';
import { helloResponseSchema } from './schema';

export const api = {
  hello: {
    get: {
      method: 'GET' as const,
      path: '/api/hello' as const,
      responses: {
        200: helloResponseSchema,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
