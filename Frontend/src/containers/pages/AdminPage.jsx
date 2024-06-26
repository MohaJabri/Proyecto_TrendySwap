import Publications from "../../components/admin/Publications";
import Users from "../../components/admin/Users";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import Layout from "../../hocs/Layout";
import { get_search_publications } from "../../redux/actions/publications";
import { get_users } from "../../redux/actions/users";
Layout;

const AdminPage = ({ get_search_publications, get_users }) => {
  const [show, setShow] = useState(0);
  const [active, setActive] = useState(1);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(true);

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setShowAll(searchTerm.trim() === "");
    setActive(1);
  };

  const performSearch = (searchTerm) => {
    if (show === 0) {
      get_search_publications(searchTerm, 1);
    } else if (show === 1) {
      get_users(searchTerm);
    }
  };

  useEffect(() => {
    if (showAll) {
      performSearch("");
    } else {
      performSearch(search);
    }
  }, [show, showAll, search]);

  return (
    <Layout>
      <section className="bg-gray-50 p-3 sm:p-5 min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white  relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
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
                      placeholder={show === 0 ? "Buscar publicación" : "Buscar usuario"}
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  onClick={() => setShow(0)}
                  type="button"
                  className={`flex items-center justify-center  font-medium rounded-lg text-sm px-4 py-2  focus:outline-none ${
                    show === 0
                      ? "text-white bg-teal-600  hover:bg-teal-700 "
                      : "text-gray-500 bg-gray-200 hover:bg-gray-300 opacity-75"
                  }}`}
                >
                  Publicaciones
                </button>

                <button
                  onClick={() => setShow(1)}
                  type="button"
                  className={`flex items-center justify-center  font-medium rounded-lg text-sm px-4 py-2  focus:outline-none ${
                    show === 1
                      ? "text-white bg-teal-600  hover:bg-teal-700 "
                      : "text-gray-500 bg-gray-200 hover:bg-gray-300 opacity-75"
                  }}`}
                >
                  Usuarios
                </button>
              </div>
            </div>

            {show === 0 && (
              <Publications
                searchTerm={search}
                active={active}
                setActive={setActive}
              />
            )}
            {show === 1 && <Users />}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default connect(null, {
  get_search_publications,
  get_users,
})(AdminPage);
