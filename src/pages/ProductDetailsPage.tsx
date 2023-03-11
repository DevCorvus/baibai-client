import ProductDetails from '../components/product/ProductDetails';
import { useParams } from 'react-router-dom';
import { useProductDetailsQuery } from '../services/products.service';
import Loading from '../components/states/Loading';
import Error from '../components/states/Error';

export default function ProductDetailsPage() {
  const params = useParams();
  const { data, isLoading, isError, error } = useProductDetailsQuery(
    params.id as string
  );

  if (isLoading) return <Loading />;
  if (isError && error?.response?.status !== 404) return <Error />;

  return (
    <div className="centered-fixed-container">
      {data ? (
        <ProductDetails {...data} />
      ) : (
        <p className="text-center text-secondary font-medium">
          Product not found
        </p>
      )}
    </div>
  );
}
