const Filters = ({ options, onFilterSelect, activeFilterId }) => {
  return (
    <div className="grid grid-cols-2 lg:flex lg:flex-row mb-4 gap-2.5">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterSelect(option.id)}
          className={`rounded-full border py-1 px-3 text-sm transition-colors duration-300 ${
            activeFilterId === option.id
              ? "bg-green-500 text-black border-none"
              : "border-white/60 text-white hover:bg-white/90 hover:text-black"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Filters;
