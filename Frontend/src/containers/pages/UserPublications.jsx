import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrashIcon,
  PlusCircleIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import {
  delete_publication,
  get_publications,
} from "../../redux/actions/publications";
import { connect } from "react-redux";
import Pagination from "../../components/navigation/Pagination";
import Layout from "../../hocs/Layout";
import { useEffect } from "react";
const backend_url = 'https://trendyswap.es';

const UserPublications = ({
  user,
  delete_publication,
  get_publications,
  publications,
}) => {
  const [previousNumber, setPreviousNumber] = useState(0);
  const [nextNumber, setNextNumber] = useState(0);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [active, setActive] = useState(1);

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setShowAll(searchTerm.trim() === "");
    setActive(1);
  };

  const performSearch = (searchTerm,id) => {
    
    get_publications(id, 1, searchTerm);
  }
  useEffect(() => {
    if (user && showAll) {
      performSearch("",user.id);
    }
    else if(user) {
      performSearch(search,user.id);
    }
    
  }, [user, showAll, search]);
  useEffect(() => {
    if (publications?.meta) {
      setPreviousNumber(publications.meta.previous);
      setNextNumber(publications.meta.next);
    }
  }, [publications]);

  const visitPage = (page) => {
    get_publications(user.id, page);
    setActive(page);
  };

  const previous = () => {
    if (previousNumber) {
      get_publications(user.id, previousNumber);
      setActive(active - 1);
    }
  };

  const next = () => {
    if (nextNumber) {
      get_publications(user.id, nextNumber);
      setActive(active + 1);
    }
  };

  const onDelete = async (id) => {
    await delete_publication(id);
    const totalPages = Math.ceil(publications.meta.count / 9);

    let newActivePage = active;

    if (publications.data.length === 1 && totalPages > 1) {
      //
      newActivePage = active > 1 ? active - 1 : 1;
    }

    await get_publications(user.id, newActivePage);
    setActive(newActivePage);
  };

  return (
    <Layout>
      {
        console.log(user?.id)
      }
      <div className="overflow-x-auto min-h-screen">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Buscar
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 "
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
                  placeholder="Buscar publicación"
                />
              </div>
            </form>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-4 py-3">
                Foto
              </th>
              <th scope="col" className="px-4 py-3">
                Servicio solicitado
              </th>

              <th scope="col" className="px-4 py-3">
                Categoría
              </th>

              <th scope="col" className="px-4 py-3">
                Fecha de creación
              </th>

              <th
                scope="col"
                className="px-4 py-3 flex justify-center gap-4 items-center"
              >
                Actions
                <Link to="/add_publication">
                  <PlusCircleIcon className="h-6 w-6 text-green-300 cursor-pointer" />
                </Link>
              </th>
            </tr>
          </thead>

          <>
            <>
              <tbody>
                {publications?.data?.map((publication) => (
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

                    <td className="px-4 py-3">
                      {publication.service_requested}
                    </td>

                    <td className="px-4 py-3">{publication.category_name}</td>

                    <td className="px-4 py-3">
                      {new Date(publication.date_created).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-4">
                        <Link to={`/update_publication/${publication.id}`}>
                          <PencilIcon className="h-6 w-6 text-green-600 cursor-pointer" />
                        </Link>

                        <TrashIcon
                          className="h-6 w-6 text-red-600 cursor-pointer"
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
        {publications?.data?.length > 0 && (
          <Pagination
            visitPage={visitPage}
            search={publications}
            active={active}
            previous={previous}
            next={next}
          />
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  publications: state.Publications.publications,
  user: state.Auth.user,
});
export default connect(mapStateToProps, {
  delete_publication,
  get_publications,
})(UserPublications);
