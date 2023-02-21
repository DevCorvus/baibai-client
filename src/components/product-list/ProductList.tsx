import { Product } from '../../interfaces/product';
import ProductItem from '../product-item/ProductItem';

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
        <div className="bg-secondary w-full h-40 rounded-md shadow-md flex justify-center items-center">
          <p className="text-secondary-content text-lg font-medium">
            There are no products to show {'.('}
          </p>
        </div>
      )}
    </>
  );
}
