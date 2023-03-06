import { z } from 'zod';

const MAX_FILE_SIZE = 1024 * 1024;
const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const productFormSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500),
  price: z.string(),
  quantity: z.coerce.number().min(1),
  location: z.string().min(1, 'Required'),
  status: z.string().min(1, 'Required'),
  image: z
    .instanceof(FileList)
    .refine((val) => {
      return Boolean(val.length);
    }, 'Image required')
    .refine((val) => {
      const file = val[0];
      return Boolean(file?.type && ALLOWED_FILE_TYPES.includes(file?.type));
    }, 'Only JPG, JPEG, PNG and WEBP files are supported')
    .refine((val) => {
      const file = val[0];
      return Boolean(file?.size && file?.size <= MAX_FILE_SIZE);
    }, 'Max image size is 1MB'),
});

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;
