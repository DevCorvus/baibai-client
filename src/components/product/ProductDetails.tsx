import { AiOutlineUser } from 'react-icons/ai';
import { ProductExtended } from '../../interfaces/product';
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineCircleStack,
  HiOutlineMapPin,
  HiShoppingCart,
  HiTrash,
  HiPencilSquare,
} from 'react-icons/hi2';
import dayjs from 'dayjs';
import { getStatusText } from '../../utils/getStatusText';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useShoppingCartStore } from '../../stores/shopping-cart.store';
import ProductImage from './ProductImage';
import { useAuthStore } from '../../stores/auth.store';
import { useUserStore } from '../../stores/user.store';

export default function ProductDetails(product: ProductExtended) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userId = useUserStore((state) => state.profile?.id);
  const navigate = useNavigate();
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

  // TODO: Switch "Shopping cart" to "Edit product" when user is the product's owner
  return (
    <>
      <header>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-full">
            <AiOutlineUser className="text-white text-2xl" />
          </div>
          <div className="flex flex-col">
            <Link
              to={`/products?username=${product.user.username}`}
              className="font-medium text-lg link link-hover"
            >
              {product.user.username}
            </Link>
            <span className="text-secondary text-sm">
              {'member since ' + dayjs(product.user.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </header>
      <ProductImage
        className="w-full h-full object-cover object-center rounded-t-md"
        stateHeightClass="h-40"
        src={product.previewImageUrl}
        name={product.name}
      />
      <section className="flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="font-semibold text-lg px-2 py-0.5 rounded-full bg-primary-content text-primary">
            {product.price === 0 ? 'FREE' : `${product.price}$`}
          </span>
        </header>
        {product.description ? (
          <p>{product.description}</p>
        ) : (
          <p className="italic">No description</p>
        )}
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
        {product.userId !== userId ? (
          <>
            {!productAlreadyInShoppingCart ? (
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    addProductToShoppingCart(product);
                  } else {
                    navigate(`/login?ref=/products/${product.id}`);
                  }
                }}
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
          </>
        ) : (
          <Link
            to={`/products/${product.id}/edit`}
            className="btn btn-block bg-primary mt-6 flex gap-2"
          >
            <HiPencilSquare className="text-xl" />
            <span>Edit</span>
          </Link>
        )}
      </section>
    </>
  );
}
