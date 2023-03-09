import ProductList from '../components/product/ProductList';
import { useProductListQuery } from '../services/products/products.service';
import Loading from '../components/states/Loading';
import Error from '../components/states/Error';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProductListPage() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isError, refetch } =
    useProductListQuery(searchParams);

  useEffect(() => {
    if (searchParams) {
      refetch();
    }
  }, [searchParams]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return <ProductList products={data ? data : []} />;
}
