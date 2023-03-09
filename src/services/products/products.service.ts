import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import { Product, ProductDto, ProductExtended } from '../../interfaces/product';
import { AxiosError } from 'axios';

export function useProductListQuery(searchParams?: URLSearchParams) {
  return useQuery({
    queryKey: ['getAllProducts'],
    queryFn: async () => {
      let url = '/products';

      if (searchParams) url = url.concat('?', searchParams.toString());

      const { data } = await axiosInstance.get<Product[]>(url);
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
