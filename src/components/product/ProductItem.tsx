import { Link } from 'react-router-dom';
import { Product } from '../../interfaces/product';
import { getStatusText } from '../../utils/getStatusText';
import dayjs from 'dayjs';
import ProductImage from './ProductImage';

export default function ProductItem({
  id,
  name,
  price,
  quantity,
  status,
  previewImageUrl,
  createdAt,
}: Product) {
  const createdAtDays = dayjs().diff(dayjs(createdAt), 'days');

  return (
    <Link
      to={`/products/${id}`}
      className="block md:max-w-xs bg-base-100 shadow-md rounded-t-md rounded-b-md relative group"
    >
      {createdAtDays <= 3 && (
        <div className="absolute -top-3 -right-4 z-10">
          <span className="bg-accent text-accent-content p-1 rounded-lg shadow">
            New
          </span>
        </div>
      )}
      <figure className="h-40 overflow-hidden rounded-t-md">
        <ProductImage
          className="w-full h-full object-cover object-center transition group-hover:scale-110 rounded-t-md"
          stateHeightClass="h-full"
          src={previewImageUrl}
          name={name}
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
          <span className="font-semibold text-primary">
            {price === 0 ? 'FREE' : `${price}$`}
          </span>
          <p className="text-sm text-slate-500">{quantity} in stock</p>
        </div>
      </div>
    </Link>
  );
}
