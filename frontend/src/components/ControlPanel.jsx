import { Plus } from "lucide-react";
import SearchBar from "./SearchBar";
import FilterButtons from "./FilterButtons";

const ControlPanel = ({
  searchTerm,
  onSearchChange,
  filter,
  onFilterChange,
  onAddNew,
}) => {
  return (
    <div className="card mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        <FilterButtons filter={filter} onFilterChange={onFilterChange} />
        <button
          className="btn-primary flex items-center gap-2"
          onClick={onAddNew}
        >
          <Plus size={20} />
          추가
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
