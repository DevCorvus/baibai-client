import { z } from 'zod';
import val from 'validator';

export const registerFormSchema = z
  .object({
    username: z.string().min(4).max(100),
    password: z.string().min(6).max(250),
    passwordConfirmation: z.string(),
  })
  .refine((values) => val.isAlphanumeric(values.username), {
    path: ['username'],
    message: 'Must contain only letters and numbers',
  })
  .refine((values) => values.password === values.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords does not match',
  });

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
