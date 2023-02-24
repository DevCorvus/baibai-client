export default function AppLoading() {
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="flex justify-center items-center gap-2">
        <span className="inline-block w-8 h-8 border-4 border-slate-100 border-t-transparent rounded-full animate-spin"></span>
        <p className="text-white text-3xl font-bold">Loading</p>
      </div>
    </div>
  );
}
