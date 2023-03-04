import { AiOutlineUser } from 'react-icons/ai';
import { ProductExtended } from '../../interfaces/product';
import { TbPhotoOff } from 'react-icons/tb';
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCircleStack,
  HiOutlineMapPin,
  HiShoppingCart,
  HiTrash,
} from 'react-icons/hi2';
import dayjs from 'dayjs';
import { getStatusText } from '../../utils/getStatusText';
import { useParams } from 'react-router-dom';
import { useShoppingCartStore } from '../../stores/shopping-cart.store';

export default function ProductDetails(product: ProductExtended) {
  const params = useParams();
  const {
    productAlreadyInShoppingCart,
    addProductToShoppingCart,
    removeProductFromShoppingCart,
  } = useShoppingCartStore((state) => ({
    productAlreadyInShoppingCart: state.exists(params.id as string),
    addProductToShoppingCart: state.add,
    removeProductFromShoppingCart: state.remove,
  }));

  // TODO: Create a link to fetch products from a specific username
  // TODO: Switch "Shopping cart" to "Edit product" when user is the product's owner
  return (
    <>
      <header>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-full">
            <AiOutlineUser className="text-white text-2xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-lg">{product.user.username}</span>
            <span className="text-secondary text-sm">
              {'member since ' + dayjs(product.user.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </header>
      {product.previewImageUrl ? (
        <img
          className="w-full h-full object-cover object-center rounded-t-md"
          src={product.previewImageUrl}
          alt={product.name + '(Image)'}
        />
      ) : (
        <div className="h-40 flex items-center justify-center bg-slate-100">
          <TbPhotoOff className="text-5xl text-slate-400" />
        </div>
      )}
      <section className="flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="font-semibold text-lg px-2 py-0.5 rounded-full bg-primary-content text-primary">
            {product.price}$
          </span>
        </header>
        <p>{product.description}</p>
        <div>
          <span className="block mt-5 mb-3 font-semibold">Details</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-1">
              <HiOutlineCheckCircle className="text-2xl text-primary" />
              <span>{getStatusText(product.status)}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineCircleStack className="text-2xl text-primary" />
              <span>{product.quantity} in stock</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineClock className="text-2xl text-primary" />
              <span>Posted {dayjs(product.createdAt).fromNow()}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineMapPin className="text-2xl text-primary" />
              <span>{product.location}</span>
            </div>
          </div>
        </div>
        {!productAlreadyInShoppingCart ? (
          <button
            onClick={() => addProductToShoppingCart(product)}
            className="btn btn-block bg-primary mt-6 flex gap-2"
          >
            <HiShoppingCart className="text-xl" />
            <span>Add to the cart</span>
          </button>
        ) : (
          <button
            onClick={() => removeProductFromShoppingCart(product.id)}
            className="btn btn-block bg-error mt-6 flex gap-2"
          >
            <HiTrash className="text-xl" />
            <span>Remove from shopping cart</span>
          </button>
        )}
      </section>
    </>
  );
}
