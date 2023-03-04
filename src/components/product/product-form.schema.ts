import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500),
  price: z.string(),
  quantity: z.coerce.number().min(1),
  location: z.string().min(1, 'Required'),
  status: z.string().min(1, 'Required'),
});

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;
