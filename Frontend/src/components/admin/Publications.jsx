import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrashIcon,
  PlusCircleIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import {
  delete_publication,
  get_search_publications,
} from "../../redux/actions/publications";
import { connect } from "react-redux";
import Pagination from "../navigation/Pagination";
import { useEffect } from "react";
const backend_url = 'https://api.trendyswap.es';;

const Publications = ({
  search_publications,
  delete_publication,
  get_search_publications,
  searchTerm,
  active,
  setActive,
}) => {
  const [previousNumber, setPreviousNumber] = useState(0);
  const [nextNumber, setNextNumber] = useState(0);
  useEffect(() => {
    if (search_publications?.meta) {
      setPreviousNumber(search_publications.meta.previous);
      setNextNumber(search_publications.meta.next);
    }
  }, [search_publications]);

  const visitPage = (page) => {
    get_search_publications(searchTerm, page);
    setActive(page);
  };

  const previous = () => {
    if (previousNumber) {
      get_search_publications(searchTerm, previousNumber);
      setActive(active - 1);
    }
  };

  const next = () => {
    if (nextNumber) {
      get_search_publications(searchTerm, nextNumber);
      setActive(active + 1);
    }
  };

  const onDelete = async (id) => {
    await delete_publication(id);
    const totalPages = Math.ceil(search_publications.meta.count / 9);

    let newActivePage = active;

    if (search_publications.data.length === 1 && totalPages > 1) {
      newActivePage = active > 1 ? active - 1 : 1;
    }

    await get_search_publications(searchTerm, newActivePage);
    setActive(newActivePage);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-4 py-3">
              ID de la publicación
            </th>
            <th scope="col" className="px-4 py-3">
              Nombre
            </th>

            <th scope="col" className="px-4 py-3">
              Categoría
            </th>

            <th scope="col" className="px-4 py-3">
              Usuario
            </th>

            <th
              scope="col"
              className="px-4 py-3 flex justify-center gap-4 items-center"
            >
              Acciones
              
            </th>
          </tr>
        </thead>

        <>
          <>
            <tbody>
              {search_publications?.data?.map((publication) => (
                <tr className="border-b " key={publication.id}>
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      {publication.photos[0]?.image ? (
                        <img
                          src={`${backend_url}${publication.photos[0]?.image}`}
                          alt="publication"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="800px"
                          height="800px"
                          viewBox="0 0 120 120"
                          fill="none"
                          className="w-full h-full"
                        >
                          <rect width="120" height="120" fill="#EFF1F3" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M33.2503 38.4816C33.2603 37.0472 34.4199 35.8864 35.8543 35.875H83.1463C84.5848 35.875 85.7503 37.0431 85.7503 38.4816V80.5184C85.7403 81.9528 84.5807 83.1136 83.1463 83.125H35.8543C34.4158 83.1236 33.2503 81.957 33.2503 80.5184V38.4816ZM80.5006 41.1251H38.5006V77.8751L62.8921 53.4783C63.9172 52.4536 65.5788 52.4536 66.6039 53.4783L80.5006 67.4013V41.1251ZM43.75 51.6249C43.75 54.5244 46.1005 56.8749 49 56.8749C51.8995 56.8749 54.25 54.5244 54.25 51.6249C54.25 48.7254 51.8995 46.3749 49 46.3749C46.1005 46.3749 43.75 48.7254 43.75 51.6249Z"
                            fill="#687787"
                          />
                        </svg>
                      )}
                    </span>
                  </th>

                  <td className="px-4 py-3">{publication.service_requested}</td>

                  <td className="px-4 py-3">{publication.category_name}</td>

                  <td className="px-4 py-3">{publication.user_full_name}</td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-4">
                      <Link to={`/update_publication/${publication.id}`}>
                        <PencilIcon className="h-6 w-6 text-green-600 cursor-pointer" />
                      </Link>
                      <TrashIcon
                        className="h-6 w-6 text-red-300 cursor-pointer"
                        onClick={() => onDelete(publication.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        </>
      </table>
      {search_publications?.data?.length > 0 && (
        <Pagination
          visitPage={visitPage}
          search={search_publications}
          active={active}
          previous={previous}
          next={next}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  search_publications: state.Publications.search_publications,
});
export default connect(mapStateToProps, {
  delete_publication,
  get_search_publications,
})(Publications);
