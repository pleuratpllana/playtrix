import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || totalPages === 0}
        className="flex items-center text-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed group"
      >
        <ChevronLeftIcon className="mt-0.5 w-4 h-4 text-white/70 group-hover:text-white transition duration-300" />
        <span className="ml-1 text-white/70 text-sm group-hover:text-white transition duration-300">
          Prev
        </span>
      </button>
      <div className="flex space-x-2 text-sm justify-end">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-1.5 py-1 rounded-full ${
              currentPage === i + 1
                ? "bg-green-500 text-black px-3"
                : "bg-transparent text-white/70 hover:text-green-500 transition duration-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="flex items-center text-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed group"
      >
        <span className="mr-1 text-white/70 text-sm group-hover:text-white transition duration-300">
          Next
        </span>
        <ChevronRightIcon className="mt-0.5 w-4 h-4 text-white/70 group-hover:text-white transition duration-300" />
      </button>
    </div>
  );
};

export default Pagination;
