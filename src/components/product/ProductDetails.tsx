import { AiOutlineUser } from 'react-icons/ai';
import { ProductExtended } from '../../interfaces/product';
import { TbPhotoOff } from 'react-icons/tb';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { HiOutlineClock } from 'react-icons/hi2';
import { HiOutlineCircleStack } from 'react-icons/hi2';
import { HiOutlineMapPin } from 'react-icons/hi2';
import dayjs from 'dayjs';
import { getStatusText } from '../../utils/getStatusText';

export default function ProductDetails({
  name,
  description,
  price,
  status,
  quantity,
  location,
  previewImageUrl,
  createdAt,
  user,
}: ProductExtended) {
  return (
    <div className="mx-auto max-w-lg flex flex-col gap-4 p-6 bg-base-100 rounded-md">
      <header>
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-full">
            <AiOutlineUser className="text-white text-2xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-lg">{user.username}</span>
            <span className="text-secondary text-sm">
              {'member since ' + dayjs(user.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </header>
      {previewImageUrl ? (
        <img
          className="w-full h-full object-cover object-center rounded-t-md"
          src={previewImageUrl}
          alt={name + '(Image)'}
        />
      ) : (
        <div className="h-40 flex items-center justify-center bg-slate-100">
          <TbPhotoOff className="text-5xl text-slate-400" />
        </div>
      )}
      <section className="flex flex-col gap-2">
        <header className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="font-semibold text-lg px-2 py-0.5 rounded-full bg-primary-content text-primary">
            {price}$
          </span>
        </header>
        <p>{description}</p>
        <div>
          <span className="block mt-5 mb-3 font-semibold">Details</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-1">
              <HiOutlineCheckCircle className="text-2xl text-primary" />
              <span>{getStatusText(status)}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineCircleStack className="text-2xl text-primary" />
              <span>{quantity} in stock</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineClock className="text-2xl text-primary" />
              <span>Posted {dayjs(createdAt).fromNow()}</span>
            </div>
            <div className="flex items-center gap-1">
              <HiOutlineMapPin className="text-2xl text-primary" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <button className="btn btn-block bg-primary mt-6">
          Add to the cart
        </button>
      </section>
    </div>
  );
}
