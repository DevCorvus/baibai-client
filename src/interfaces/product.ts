export type ProductStatus = 'new' | 'like-new' | 'refurbished' | 'secondhand';

export interface Product {
  id: string;
  userId: string;
  name: string;
  price: number;
  quantity: number;
  previewImage: string;
  status: ProductStatus;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}
