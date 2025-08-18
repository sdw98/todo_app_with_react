const FilterButtons = ({ filter, onFilterChange }) => {
  return (
    <div className="flex gap-2">
      <button
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          filter === "all"
            ? "bg-primary-100 text-primary-700 border border-primary-300"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => onFilterChange("all")}
      >
        전체
      </button>
      <button
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          filter === "pending"
            ? "bg-orange-100 text-orange-700 border border-orange-300"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => onFilterChange("pending")}
      >
        진행중
      </button>
      <button
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          filter === "completed"
            ? "bg-green-100 text-green-700 border border-green-300"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={() => onFilterChange("completed")}
      >
        완료
      </button>
    </div>
  );
};

export default FilterButtons;
