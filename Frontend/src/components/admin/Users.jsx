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
const backend_url = 'https://api.trendyswap.es';;
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
              Foto de perfil
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
                    <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      {user.profile.profile_image ? (
                        <img
                          src={`${backend_url}${user.profile.profile_image}`}
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
