interface Props {
  onSearch: (value: string) => void;
  searchKey: string;
}

export default function SearchBar({ onSearch, searchKey }: Props) {
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
