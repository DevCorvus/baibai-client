import { useSearchParams } from 'react-router-dom';
import { Product } from '../../interfaces/product';
import ProductItem from './ProductItem';
import ProductSearch from './ProductSearch';
import { useMemo } from 'react';

interface ProductListInterface {
  products: Product[];
}

export default function ProductList({ products }: ProductListInterface) {
  const [searchParams] = useSearchParams();

  const header = useMemo(() => {
    const search = searchParams.get('search');
    const username = searchParams.get('username');

    if (search && username) {
      return `Search results from ${username}`;
    } else if (search) {
      return 'Search results';
    } else if (username) {
      return username;
    } else {
      return 'All';
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-4">
      <ProductSearch />
      <div>
        <span className="font-semibold text-secondary text-lg">{header}</span>
      </div>
      {products.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="bg-base-100 p-10 rounded-md w-full shadow-md">
          <p className="text-center text-secondary font-medium">
            There are no products to show here {'.('}
          </p>
        </div>
      )}
    </div>
  );
}
