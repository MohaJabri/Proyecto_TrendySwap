import { SearchIcon } from "@heroicons/react/solid";

const SearchBox = ({ categories, search, onChange, onSubmit }) => {
  return (
    <form className="items-center" onSubmit={(e) => onSubmit(e)}>
      <div className="flex rounded-md shadow-sm">
        <div className="focus:outline-none hover:bg-gray-100 flex border border-gray-300 ">
          <select
            onChange={(e) => onChange(e)}
            name="category_id"
            className="px-2 focus:outline-indigo-500"
          >
            <option value={0}>All</option>
            {categories?.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="search"
            name="search"
            onChange={(e) => onChange(e)}
            value={search}
            className="focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500  hover:bg-gray-100 px-2 py-2 border block w-full rounded-none pl-4 pr-4 sm:text-sm border-gray-300 "
            placeholder="Que quieres buscar?"
          />
        </div>
        <button
          type="submit"
          className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
