import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen -z-10 pointer-events-none">
      <div className="h-full flex justify-center items-center text-primary">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
      </div>
    </div>
  );
}
