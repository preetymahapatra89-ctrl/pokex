import type { SearchProps } from "../types/search";

export default function SearchBar({ onSearch, searchKey }: SearchProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchKey}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
