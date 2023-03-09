import { HiTrash } from 'react-icons/hi2';
import { useDeleteProductMutation } from '../../services/products/products.service';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/user.store';
import { useState } from 'react';

interface DeleteProductButtonInterface {
  id: string;
}

export default function DeleteProductButton({
  id,
}: DeleteProductButtonInterface) {
  const username = useUserStore((state) => state.profile?.username);
  const navigate = useNavigate();
  const mutation = useDeleteProductMutation();

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleConfirm = () => {
    mutation.mutate(id, {
      onSuccess: () => {
        toast.success('Product deleted successfully');
        navigate(`/products?username=${username}`);
      },
    });
  };

  return (
    <>
      <div className="tooltip tooltip-error" data-tip="Delete product">
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-outline btn-error btn-sm btn-circle text-xl"
        >
          <HiTrash />
        </button>
      </div>
      {showModal && (
        <div className="z-50 top-0 left-0 fixed w-screen h-screen flex flex-col items-center justify-center bg-slate-900 bg-opacity-50">
          <div className="bg-base-100 p-6 rounded-box shadow-md border flex flex-col gap-4">
            <p>Are you sure about deleting this product?</p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleConfirm}
                className="flex-1 btn btn-sm btn-error"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 btn btn-sm btn-secondary btn-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
