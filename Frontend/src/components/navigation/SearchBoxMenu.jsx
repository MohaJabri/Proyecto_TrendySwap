import { useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { comunidadesAutonomas } from "../../utils/locations";
import { Input, Button } from "@material-tailwind/react";

const SearchBox = ({
  categories,
  search,
  onChange,
  onSubmit, // Cambié el nombre de la función de onSearch a onSubmit
  category_id,
  order,
  location,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };
  useEffect(() => {
    const savedShowFilters = localStorage.getItem("showFilters");
    if (savedShowFilters !== null) {
      setShowFilters(JSON.parse(savedShowFilters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showFilters", JSON.stringify(showFilters));
  }, [showFilters]);

  return (
    <form className="items-center" onSubmit={(e) => onSubmit(e)}>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleFilters}
              className="text-sm text-blue-500 focus:outline-none"
            >
              {showFilters ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700 dark:text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700 dark:text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="relative w-full md:w-[100px] lg:w-[200px] gap-2">
            <Input
              type="search"
              name="search"
              onChange={(e) => onChange(e)}
              value={search}
              containerProps={{
                className: "min-w-[144px] md:min-w-[100px] lg:min-w-[200px]",
              }}
              className="!border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
              placeholder="Que quieres buscar?"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className="!absolute left-3 top-[13px]">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="#CFD8DC"
                />
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="#CFD8DC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <Button
            size="md"
            className="mt-1 rounded-lg sm:mt-0 bg-teal-600"
            type="submit"
          >
            <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                  fill="#CFD8DC"
                />
                <path
                  d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                  stroke="#CFD8DC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2">
            <div className="focus:outline-none hover:bg-gray-100 flex border border-gray-300 rounded-md">
              <select
                value={location}
                onChange={(e) => onChange(e)}
                name="location"
                className="px-2 py-1 focus rounded-md"
              >
                <option value={""}>Ubicaciones</option>
                {comunidadesAutonomas?.map((location, index) => (
                  <option key={index} value={location.name}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>{" "}
            <div className="focus:outline-none hover:bg-gray-100 flex border border-gray-300 rounded-md">
              <select
                value={order}
                onChange={(e) => onChange(e)}
                name="order"
                className="px-2 py-1 focus:outline-teal-500 rounded-md"
              >
                <option value={""}>Fecha</option>
                <option value={"asc"}>Antiguos Primero</option>
                <option value={"desc"}>Nuevos Primero</option>
              </select>
            </div>
            <div className="focus:outline-none hover:bg-gray-100 flex border border-gray-300 rounded-md">
              <select
                value={category_id}
                onChange={(e) => onChange(e)}
                name="category_id"
                className="px-2 py-1 focus:outline-teal-500 rounded-md"
              >
                <option value={0}>Todas las categorías</option>
                {categories?.map((category, index) => (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBox;
