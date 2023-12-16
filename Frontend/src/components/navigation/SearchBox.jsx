import { SearchIcon } from "@heroicons/react/solid";

const SearchBox = ({
  categories,
  search,
  onChange,
  onSubmit,
  category_id,
  location,
}) => {
  const comunidadesAutonomas = [
    { id: 1, name: "Andalucía" },
    { id: 2, name: "Aragón" },
    { id: 3, name: "Asturias" },
    { id: 4, name: "Islas Baleares" },
    { id: 5, name: "Islas Canarias" },
    { id: 6, name: "Cantabria" },
    { id: 7, name: "Castilla-La Mancha" },
    { id: 8, name: "Castilla y León" },
    { id: 9, name: "Cataluña" },
    { id: 10, name: "Comunidad Valenciana" },
    { id: 11, name: "Extremadura" },
    { id: 12, name: "Galicia" },
    { id: 13, name: "Comunidad de Madrid" },
    { id: 14, name: "Región de Murcia" },
    { id: 15, name: "Comunidad Foral de Navarra" },
    { id: 16, name: "País Vasco (Euskadi)" },
    { id: 17, name: "La Rioja" },
    { id: 18, name: "Ceuta" },
    { id: 19, name: "Melilla" },
  ];
  return (
    <form className="items-center" onSubmit={(e) => onSubmit(e)}>
      <div className="flex rounded-md shadow-sm">
        <div className="focus:outline-none hover:bg-gray-100 flex border border-gray-300 ">
          <select
            value={location}
            onChange={(e) => onChange(e)}
            name="location"
            className="px-2 focus:outline-indigo-500"
          >
            <option value={""}>Ubicaciones</option>
            {comunidadesAutonomas?.map((location, index) => (
              <option key={index} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="focus:outline-none hover:bg-gray-100 flex border border-gray-300 ">
          <select
            value={category_id}
            onChange={(e) => onChange(e)}
            name="category_id"
            className="px-2 focus:outline-indigo-500"
          >
            <option value={0}>Todas las categorías</option>
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
