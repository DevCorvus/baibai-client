import { Link } from 'react-router-dom';
import { Product, ProductStatus } from '../../interfaces/product';

function getStatusText(status: ProductStatus): string {
  switch (status) {
    case 'new':
      return 'New';
    case 'like-new':
      return 'Like new';
    case 'refurbished':
      return 'Refurbished';
    case 'secondhand':
      return 'Secondhand';
    default:
      return 'Unknown';
  }
}

export default function ProductItem({
  id,
  name,
  price,
  quantity,
  status,
  previewImage,
}: Product) {
  return (
    <Link
      to={`/products/${id}`}
      className="block md:max-w-xs bg-base-100 shadow-md rounded-b-md relative group"
    >
      <div className="absolute -top-3 -right-4 z-10">
        <span className="bg-accent text-accent-content p-1 rounded-lg shadow">
          New
        </span>
      </div>
      <figure className="h-40 overflow-hidden rounded-t-md">
        <img
          className="w-full h-full object-cover object-center transition group-hover:scale-110 rounded-t-md"
          src={previewImage}
          alt={name + '(Image)'}
        />
      </figure>
      <div className="flex justify-between p-4 rounded-b-md">
        <div>
          <h3 className="font-semibold">{name}</h3>
          <span className="text-sm text-slate-500">
            {getStatusText(status)}
          </span>
        </div>
        <div>
          <span className="font-semibold text-primary">{price}$</span>
          <p className="text-sm text-slate-500">{quantity} in stock</p>
        </div>
      </div>
    </Link>
  );
}
