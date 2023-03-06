import { useState } from 'react';
import { API_URL } from '../../config/constants';
import { TbPhoto, TbPhotoOff } from 'react-icons/tb';

interface ImageInterface {
  className?: string;
  stateHeightClass: string;
  src: string;
  name: string;
}

export default function Image({
  className,
  stateHeightClass,
  src,
  name,
}: ImageInterface) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      {(loading || error) && (
        <div
          className={`${stateHeightClass} flex items-center justify-center bg-slate-100`}
        >
          {loading && (
            <div className="tooltip tooltip-info" data-tip="Loading image">
              <TbPhoto className="text-5xl text-slate-400 animate-pulse" />
            </div>
          )}
          {error && (
            <div
              className="tooltip tooltip-error"
              data-tip="Image could not be loaded"
            >
              <TbPhotoOff className="text-5xl text-error " />
            </div>
          )}
        </div>
      )}
      <img
        hidden={loading || error}
        className={className}
        src={`${API_URL}/products/preview/${src}`}
        alt={`${name} (Image)`}
        crossOrigin="anonymous"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </>
  );
}
