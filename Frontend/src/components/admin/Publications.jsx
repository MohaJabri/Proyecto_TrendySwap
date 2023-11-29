import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/outline";
import {
  delete_publication,
  get_search_publications,
} from "../../redux/actions/publications";
import { connect } from "react-redux";
import Pagination from "../navigation/Pagination";
const Publications = ({
  search_publications,
  delete_publication,
  get_search_publications,
  searchTerm,
  active,
  setActive,
}) => {
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
              Count in stock
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

                  <td className="px-4 py-3">{publication.name}</td>

                  <td className="px-4 py-3">{publication.category}</td>

                  <td className="px-4 py-3">{publication.count_in_stock}</td>

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
          get_search={get_search_publications}
          search={search_publications}
          searchTerm={searchTerm}
          active={active}
          setActive={setActive}
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
