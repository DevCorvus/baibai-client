export type ProductStatus = 'new' | 'like-new' | 'refurbished' | 'secondhand';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  status: ProductStatus;
  previewImageUrl: string;
  createdAt: Date;
}

export interface ProductExtended extends Product {
  description: string;
  location: string;
  userId: string;
  user: {
    username: string;
    createdAt: Date;
  };
  updatedAt: Date;
}

export interface ShoppingCartProduct {
  product: Product;
  amount: number;
}
