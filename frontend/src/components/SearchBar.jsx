import { Search } from "lucide-react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative flex-grow">
      <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
      <input
        className="input-field pl-10"
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;
