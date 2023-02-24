import ProductDetails from '../components/product/ProductDetails';
import { useParams } from 'react-router-dom';
import { useProductDetailsQuery } from '../services/products/products.service';
import Loading from '../components/states/Loading';
import Error from '../components/states/Error';

export default function ProductDetailsPage() {
  const params = useParams();
  const { data, isLoading, isError } = useProductDetailsQuery(
    params.id as string
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  if (data) {
    return <ProductDetails {...data} />;
  } else {
    return <span>Product not found</span>; // TODO
  }
}
