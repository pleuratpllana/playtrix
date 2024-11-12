import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Pagination = () => {
  return (
    <main className="flex flex-row justify-between mt-10 text-sm">
      <button className="flex flex-row items-center transition-colors duration-200 hover:text-green-500">
        <ChevronLeftIcon className="w-4 h-4 mr-0.5" />
        Prev
      </button>
      <div className="flex flex-row space-x-4 ">
        <span className="cursor-pointer">1</span>
        <span className="cursor-pointer">2</span>
        <span className="cursor-pointer">3</span>
        <span className="cursor-pointer">4</span>
        <span className="cursor-pointer">5</span>
        <span className="cursor-pointer">6</span>
        <span className="cursor-pointer">7</span>
        <span className="cursor-pointer">8</span>
        <span className="cursor-pointer">9</span>
        <span className="cursor-pointer">10</span>
      </div>
      <button className="flex flex-row items-center transition-colors duration-200 hover:text-green-500">
        Next
        <ChevronRightIcon className="w-4 h-4 mt-0.5 ml-0.5" />
      </button>
    </main>
  );
};

export default Pagination;
