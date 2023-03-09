import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ProductFormSchemaType,
  productFormSchema,
} from './product-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useUpdateProductMutation,
  useUpdateProductWithImageMutation,
} from '../../services/products/products.service';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { ProductExtended } from '../../interfaces/product';
import { useState } from 'react';
import { HiXMark } from 'react-icons/hi2';

interface EditProductFormInterface {
  product: ProductExtended;
  locations: string[];
}

export default function EditProductForm({
  product,
  locations,
}: EditProductFormInterface) {
  const navigate = useNavigate();
  const mutation = useUpdateProductMutation(product.id);
  const mutationWithImage = useUpdateProductWithImageMutation(product.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
  });

  const [updateImage, setUpdateImage] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ProductFormSchemaType> = (data) => {
    const image = data.image ? data.image[0] : undefined;

    const onSuccess = () => {
      toast.success('Product updated successfully');
      navigate(`/products/${product.id}`);
    };

    if (image) {
      mutationWithImage.mutate({ ...data, image }, { onSuccess });
    } else {
      mutation.mutate({ ...data, image }, { onSuccess });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <header className="mb-2 text-2xl text-primary font-bold">
        <h1>Edit product</h1>
      </header>
      {!updateImage ? (
        <button
          onClick={() => setUpdateImage(true)}
          type="button"
          className="btn btn-outline"
        >
          Update image
        </button>
      ) : (
        <div className="form-control">
          <label htmlFor="image" className="label">
            Image
          </label>
          <div className="flex items-center gap-4">
            <input
              {...register('image')}
              type="file"
              id="image"
              className="flex-1 file-input file-input-bordered"
            />
            <button
              onClick={() => setUpdateImage(false)}
              type="button"
              className="btn btn-outline btn-circle"
            >
              <HiXMark className="text-2xl" />
            </button>
          </div>
          {errors.image && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.image.message}
              </span>
            </label>
          )}
        </div>
      )}
      <div className="form-control">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Product name"
          className="input input-bordered"
          defaultValue={product.name}
        />
        {errors.name && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.name.message}
            </span>
          </label>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="description" className="label">
          <span>Description</span>
          <span className="text-secondary text-sm">(Optional)</span>
        </label>
        <textarea
          {...register('description')}
          id="description"
          placeholder="Product description"
          className="textarea textarea-bordered resize-none"
          defaultValue={product.description}
        ></textarea>
        {errors.description && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.description.message}
            </span>
          </label>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="form-control">
          <label htmlFor="price" className="label">
            <span>Price</span>
            <span className="text-secondary text-sm">(USD)</span>
          </label>
          <input
            {...register('price')}
            type="number"
            step="any"
            id="price"
            placeholder="Product price"
            min={0}
            defaultValue={product.price}
            className="input input-bordered"
          />
          {errors.price && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.price.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="quantity" className="label">
            Quantity
          </label>
          <input
            {...register('quantity')}
            type="number"
            id="quantity"
            placeholder="Product quantity"
            className="input input-bordered"
            min={1}
            defaultValue={product.quantity}
          />
          {errors.quantity && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.quantity.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="status" className="label">
            Status
          </label>
          <select
            {...register('status')}
            id="status"
            className="select select-bordered"
            defaultValue={product.status}
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="new">New</option>
            <option value="like-new">Like new</option>
            <option value="refurbished">Refurbished</option>
            <option value="secondhand">Secondhand</option>
          </select>
          {errors.status && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.status.message}
              </span>
            </label>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="location" className="label">
            Location
          </label>
          <select
            {...register('location')}
            id="location"
            className="select select-bordered"
            defaultValue={product.location}
          >
            <option value="" disabled>
              Select location
            </option>
            {locations &&
              locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
          </select>
          {errors.location && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.location.message}
              </span>
            </label>
          )}
        </div>
      </div>
      <div className="divider"></div>
      <button
        type="submit"
        disabled={mutation.isLoading}
        className={`btn btn-primary btn-block ${
          mutation.isLoading ? 'loading' : ''
        }`}
      >
        Save
      </button>
      <Link
        to={`/products/${product.id}`}
        className="btn btn-secondary btn-outline"
      >
        Cancel
      </Link>
    </form>
  );
}
