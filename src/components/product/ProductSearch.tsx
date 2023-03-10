import { useEffect, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';

export default function ProductSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search);

  useEffect(() => {
    if (debouncedSearch) {
      searchParams.set('search', debouncedSearch);
      setSearchParams(searchParams);
    } else {
      searchParams.delete('search');
      setSearchParams(searchParams);
    }
  }, [debouncedSearch]);

  return (
    <div className="input-group">
      <input
        onChange={(e) => setSearch(e.target.value.trim())}
        value={search}
        className="input input-bordered"
        placeholder="Search"
        type="text"
      />
      <button className="btn btn-square btn-disabled bg-secondary">
        <HiMagnifyingGlass className="text-xl text-primary-content" />
      </button>
    </div>
  );
}
