import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { Product, ProductDto, ProductExtended } from '../../interfaces/product';
import { AxiosError } from 'axios';

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
  return useQuery<ProductExtended, AxiosError>({
    queryKey: ['getOneProduct'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProductExtended>(
        `/products/${id}`
      );
      return data;
    },
    retry: false,
  });
}

export function useAddProductMutation() {
  return useMutation({
    mutationKey: ['addProduct'],
    mutationFn: async (product: ProductDto) => {
      const { data } = await axiosInstance.post<ProductExtended>(
        '/products',
        product,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    },
  });
}

export function useProductLocationsQuery() {
  return useQuery({
    queryKey: ['getProductLocations'],
    queryFn: async () => {
      const { data } = await axiosInstance.get<string[]>('/products/locations');
      return data;
    },
  });
}
