import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  TrashIcon,
  PlusCircleIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { get_users, delete_user } from "../../redux/actions/users";
import { connect } from "react-redux";
import Pagination from "../navigation/Pagination";
import { useEffect } from "react";
const Users = ({
  users,
  delete_user,
  get_users,
  searchTerm,
  active,
  setActive,
}) => {
  const [previousNumber, setPreviousNumber] = useState(0);
  const [nextNumber, setNextNumber] = useState(0);
  useEffect(() => {
    if (users?.meta) {
      setPreviousNumber(users.meta.previous);
      setNextNumber(users.meta.next);
    }
  }, [users]);

  const visitPage = (page) => {
    get_users(searchTerm, page);
    setActive(page);
  };

  const previous = () => {
    if (previousNumber) {
      get_users(searchTerm, previousNumber);
      setActive(active - 1);
    }
  };

  const next = () => {
    if (nextNumber) {
      get_users(searchTerm, nextNumber);
      setActive(active + 1);
    }
  };

  const onDelete = async (id) => {
    await delete_user(id);
    const totalPages = Math.ceil(users.meta.count / 9);

    let newActivePage = active;

    if (users.data.length === 1 && totalPages > 1) {
      //
      newActivePage = active > 1 ? active - 1 : 1;
    }

    await get_users(searchTerm, newActivePage);
    setActive(newActivePage);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-4 py-3">
              user ID
            </th>
            <th scope="col" className="px-4 py-3">
              Nombre
            </th>

            <th scope="col" className="px-4 py-3">
              Apellido
            </th>

            <th scope="col" className="px-4 py-3">
              correo electrónico
            </th>

            <th
              scope="col"
              className="px-4 py-3 flex justify-center gap-4 items-center"
            >
              Acciones
              <Link to="add">
                <PlusCircleIcon className="h-6 w-6 text-green-300 cursor-pointer" />
              </Link>
            </th>
          </tr>
        </thead>

        <>
          <>
            <tbody>
              {users?.data?.map((user) => (
                <tr className="border-b " key={user.id}>
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {user.id}
                  </th>

                  <td className="px-4 py-3">{user.first_name}</td>

                  <td className="px-4 py-3">{user.last_name}</td>

                  <td className="px-4 py-3">{user.email}</td>

                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-4">
                      <Link to={`/profile/${user.id}`}>
                        <PencilIcon className="h-6 w-6 text-green-600 cursor-pointer" />
                      </Link>
                      <TrashIcon
                        className="h-6 w-6 text-red-300 cursor-pointer"
                        onClick={() => onDelete(user.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        </>
      </table>
      {users?.data?.length > 0 && (
        <Pagination
          visitPage={visitPage}
          search={users}
          active={active}
          previous={previous}
          next={next}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.Users.users,
});
export default connect(mapStateToProps, {
  get_users,
  delete_user,
})(Users);
