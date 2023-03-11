import AddProductForm from '../components/product/AddProductForm';
import Error from '../components/states/Error';
import Loading from '../components/states/Loading';
import { useProductLocationsQuery } from '../services/products.service';

export default function AddProductPage() {
  const { data, isLoading, isError } = useProductLocationsQuery();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="centered-fixed-container border-t-4 border-t-primary">
      <AddProductForm locations={data} />
    </div>
  );
}
