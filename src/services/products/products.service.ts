import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { Product, ProductExtended } from '../../interfaces/product';

export function useProductListQuery() {
  return useQuery({
    queryKey: ['getAllProducts'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Product[]>('/products');
      return data;
    },
  });
}

export function useProductDetailsQuery(id: string) {
  return useQuery({
    queryKey: ['getOneProduct'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProductExtended>(
        `/products/${id}`
      );
      return data;
    },
  });
}
