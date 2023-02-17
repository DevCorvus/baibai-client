import { z } from 'zod';

export const registerFormSchema = z
  .object({
    username: z.string().min(4).max(100),
    password: z.string().min(6).max(250),
    passwordConfirmation: z.string(),
  })
  .refine(
    (values) => {
      if (values.password === values.passwordConfirmation) {
        return true;
      } else {
        return false;
      }
    },
    { path: ['passwordConfirmation'], message: 'Passwords does not match' }
  );

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
