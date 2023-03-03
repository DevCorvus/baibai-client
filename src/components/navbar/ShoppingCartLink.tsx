import { Link } from 'react-router-dom';
import { useShoppingCartStore } from '../../stores/shopping-cart.store';
import { HiShoppingCart } from 'react-icons/hi2';

export default function ShoppingCartLink() {
  const shoppingCartCount = useShoppingCartStore((state) => state.data.length);

  return (
    <Link
      to={'/shopping-cart'}
      className="tooltip tooltip-bottom relative"
      data-tip="Shopping cart"
    >
      {shoppingCartCount !== 0 && (
        <span className="absolute top-1 right-2 px-1 rounded-full bg-red-400 text-xs">
          {shoppingCartCount}
        </span>
      )}
      <HiShoppingCart className="text-2xl" />
    </Link>
  );
}
