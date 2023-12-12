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
const UserPublications = ({
  user,
  delete_publication,
  get_publications,
  publications,
}) => {
  const [previousNumber, setPreviousNumber] = useState(0);
  const [nextNumber, setNextNumber] = useState(0);
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (user) {
      get_publications(user.id, 1);
    }
  }, [user]);
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
      <div className="overflow-x-auto min-h-screen">
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
                      {publication.id}
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
