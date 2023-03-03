import ShoppingCartList from '../components/shopping-cart/ShoppingCartList';

export default function ShoppingCartPage() {
  return (
    <div className="mx-auto max-w-lg flex flex-col gap-4 p-6 bg-base-100 rounded-md">
      <ShoppingCartList />
    </div>
  );
}
