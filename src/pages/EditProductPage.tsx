import { useParams } from 'react-router-dom';
import EditProductForm from '../components/product/EditProductForm';
import Error from '../components/states/Error';
import Loading from '../components/states/Loading';
import {
  useProductDetailsQuery,
  useProductLocationsQuery,
} from '../services/products/products.service';

export default function EditProductPage() {
  const params = useParams();
  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useProductDetailsQuery(params.id as string);
  const {
    data: locations,
    isLoading: isLoadingLocations,
    isError: isLocationsError,
  } = useProductLocationsQuery();

  if (isProductLoading || isLoadingLocations) return <Loading />;
  if (isProductError || isLocationsError) return <Error />;

  return (
    <div className="mx-auto max-w-lg flex flex-col gap-4 p-8 bg-base-100 rounded-md shadow-md border-t-4 border-t-primary">
      <EditProductForm product={product} locations={locations} />
    </div>
  );
}
