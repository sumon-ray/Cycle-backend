import { z } from 'zod';

const userValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const validation = {
  userValidation,
};
