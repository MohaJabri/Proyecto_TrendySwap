import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/outline";
import {
  delete_publication,
  get_search_publications,
} from "../../redux/actions/publications";
import { connect } from "react-redux";
import Pagination from "../navigation/Pagination";
import { useEffect } from "react";
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
      //
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
              publication ID
            </th>
            <th scope="col" className="px-4 py-3">
              Name
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
              Actions
              <Link to="add">
                <PlusCircleIcon className="h-6 w-6 text-green-300 cursor-pointer" />
              </Link>
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
                    {publication.id}
                  </th>

                  <td className="px-4 py-3">{publication.service_requested}</td>

                  <td className="px-4 py-3">{publication.category_name}</td>

                  <td className="px-4 py-3">{publication.user_full_name}</td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-4">
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
