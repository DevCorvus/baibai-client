import { FaRegSadCry } from 'react-icons/fa';

export default function Error() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen -z-10 pointer-events-none">
      <div className="h-full flex flex-col justify-center items-center gap-2">
        <div className="flex items-center gap-1 text-error font-semibold">
          <p>Something went wrong</p>
          <FaRegSadCry className="text-xl" />
        </div>
        <span className="text-xs text-slate-500">
          (Reload or try again later)
        </span>
      </div>
    </div>
  );
}
