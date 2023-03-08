import { ShoppingCartProduct } from '../../interfaces/product';
import { HiTrash, HiPlus, HiMinus } from 'react-icons/hi2';
import { useShoppingCartStore } from '../../stores/shopping-cart.store';
import { Link } from 'react-router-dom';
import ProductImage from '../product/ProductImage';
import { useMemo } from 'react';

export default function ShoppingCartItem({
  product,
  amount,
}: ShoppingCartProduct) {
  const { increaseAmount, decreaseAmount, removeFromShoppingCart } =
    useShoppingCartStore((state) => ({
      increaseAmount: state.increaseAmount,
      decreaseAmount: state.decreaseAmount,
      removeFromShoppingCart: state.remove,
    }));

  const calculatedPrice = useMemo(() => {
    return (product.price * amount).toFixed(2);
  }, [amount]);

  return (
    <div className="border rounded shadow-sm flex">
      <figure className="w-16 h-16">
        <ProductImage
          className="w-full h-full object-cover object-center rounded-l border-r"
          stateHeightClass="h-16"
          src={product.previewImageUrl}
          name={product.name}
        />
      </figure>
      <div className="w-full p-3 flex items-center justify-between">
        <Link className="link link-hover" to={`/products/${product.id}`}>
          {product.name}
        </Link>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <button
              disabled={amount === product.quantity}
              onClick={() => increaseAmount(product.id)}
              className={`btn btn-outline btn-xs btn-circle ${
                amount !== product.quantity ? 'btn-accent' : 'btn-disabled'
              }`}
            >
              <HiPlus />
            </button>
            <span>{amount}</span>
            <button
              disabled={amount === 1}
              onClick={() => decreaseAmount(product.id)}
              className={`btn btn-outline btn-xs btn-circle ${
                amount !== 1 ? 'btn-accent' : 'btn-disabled'
              }`}
            >
              <HiMinus />
            </button>
          </div>
          <span className="w-20 text-center font-semibold">
            {product.price === 0 ? 'FREE' : `${calculatedPrice}$`}
          </span>
          <button
            onClick={() => removeFromShoppingCart(product.id)}
            className="btn btn-outline btn-error btn-xs btn-circle"
          >
            <HiTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
