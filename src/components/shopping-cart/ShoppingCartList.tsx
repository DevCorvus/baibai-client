import { useEffect, useState } from 'react';
import { useShoppingCartStore } from '../../stores/shopping-cart.store';
import ShoppingCartItem from './ShoppingCartItem';
import { HiShoppingBag } from 'react-icons/hi2';

export default function ShoppingCartList() {
  const products = useShoppingCartStore((state) => state.data);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newTotal = products.reduce((_, product, value) => {
      return value + product.price;
    }, 0);

    setTotal(newTotal);
  }, products);

  return (
    <div className="mx-auto max-w-lg flex flex-col gap-4 p-6 bg-base-100 rounded-md">
      <div>
        {products.map((product) => (
          <ShoppingCartItem key={product.id} {...product} />
        ))}
      </div>
      <span>Total: {total}$</span>
      <button className="btn btn-accent flex gap-2">
        <HiShoppingBag className="text-xl" />
        <span>Confirm purchase</span>
      </button>
    </div>
  );
}
