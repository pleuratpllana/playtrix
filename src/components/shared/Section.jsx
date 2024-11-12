import { useLocation } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Section = ({
  title,
  description,
  showSearch = true,
  searchTerm,
  setSearchTerm,
  children,
}) => {
  const location = useLocation();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#1a1a1a] to-black text-white p-10 flex flex-col transition-all duration-300 ease-in-out h-[91.5vh] lg:h-[92.5vh] overflow-y-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl lg:text-4xl font-bold mb-1">
            {title} <span className="text-[#2ac060]">.</span>
          </h1>
          <p className="text-md text-white/65 mb-0">{description}</p>
        </div>

        {showSearch && (
          <div className="flex flex-col lg:flex-row sm:items-start lg:items-center mt-4 sm:mt-0 w-full lg:w-auto">
            <label htmlFor="search" className="mr-3 text-white/70 mb-3 lg:mb-0">
              Find your favorite:
            </label>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type here..."
                className="bg-transparent text-white placeholder-white/60 pl-4 pr-10 py-3 rounded-md border border-[#12853a] focus:border-white focus:outline-none focus:ring-0 transition-colors duration-300 ease-in-out w-full sm:max-w-xs"
              />
              <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2ac060]" />
            </div>
          </div>
        )}
      </div>
      {children}
    </section>
  );
};

export default Section;
