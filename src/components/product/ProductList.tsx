import { Product } from '../../interfaces/product';
import ProductItem from './ProductItem';

interface ProductListInterface {
  products: Product[];
}

export default function ProductList({ products }: ProductListInterface) {
  return (
    <>
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
