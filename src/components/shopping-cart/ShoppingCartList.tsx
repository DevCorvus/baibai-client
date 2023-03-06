import { useEffect, useState } from 'react';
import { useShoppingCartStore } from '../../stores/shopping-cart.store';
import ShoppingCartItem from './ShoppingCartItem';
import { HiShoppingBag } from 'react-icons/hi2';
import { toast } from 'react-hot-toast';

export default function ShoppingCartList() {
  // Products should be fetched from the API to keep the data in sync
  // for demonstrative purposes, it will not be done in this case
  const { items, resetItems } = useShoppingCartStore((state) => ({
    items: state.data,
    resetItems: state.reset,
  }));
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newTotal = items.reduce((total, item) => {
      const priceTimesAmount = item.product.price * item.amount;
      return total + priceTimesAmount;
    }, 0);

    setTotal(newTotal);
  }, [items]);

  const handlePurchase = () => {
    resetItems();
    toast.success('Successful purchase');
  };

  return (
    <>
      {items.length ? (
        <>
          <div>
            <button onClick={resetItems} className="link link-error">
              Clear all ({items.length})
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <ShoppingCartItem key={item.product.id} {...item} />
            ))}
          </div>
          <span className="font-semibold text-lg">Total: {total}$</span>
          <button
            onClick={handlePurchase}
            className="btn btn-accent flex gap-2"
          >
            <HiShoppingBag className="text-xl" />
            <span>Confirm purchase</span>
          </button>
        </>
      ) : (
        <p className="text-center text-secondary font-medium">
          Shopping cart empty
        </p>
      )}
    </>
  );
}
