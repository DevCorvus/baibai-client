import { Product } from '../../interfaces/product';

export default function ShoppingCartItem(product: Product) {
  return (
    <div>
      <span>{product.name}</span>
    </div>
  );
}
