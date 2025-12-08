interface Props {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
