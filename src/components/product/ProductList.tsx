import { useSearchParams } from 'react-router-dom';
import { Product } from '../../interfaces/product';
import ProductItem from './ProductItem';

interface ProductListInterface {
  products: Product[];
}

export default function ProductList({ products }: ProductListInterface) {
  const [searchParams] = useSearchParams();
  return (
    <>
      <div className="mb-4">
        <span className="font-semibold text-secondary text-lg">
          {searchParams.get('username') ? searchParams.get('username') : 'All'}
        </span>
      </div>
      {products.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="bg-base-100 p-6 rounded-md max-w-lg mx-auto">
          <p className="text-center text-secondary font-medium">
            There are no products to show {'.('}
          </p>
        </div>
      )}
    </>
  );
}
