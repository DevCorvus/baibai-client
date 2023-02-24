import ProductList from '../components/product/ProductList';
import { useProductListQuery } from '../services/products/products.service';
import Loading from '../components/states/Loading';
import Error from '../components/states/Error';

export default function ProductListPage() {
  const { data, isLoading, isError } = useProductListQuery();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return <ProductList products={data ? data : []} />;
}
