import { Fragment, useState, useEffect } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";

import Alert from "../../components/alert";
import {
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  ShieldCheckIcon,
  ViewGridIcon,
  XIcon,
  BellIcon,
} from "@heroicons/react/outline";

import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { getCategories } from "../../redux/actions/categories";
import { get_search_publications } from "../../redux/actions/publications";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SearchBox from "./SearchBox";
import { get_notifications } from "../../redux/actions/notification";
const backend_url = import.meta.env.VITE_API_URL;
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({
  get_notifications,
  update,
  profile,
  isAuthenticated,
  user,
  logout,
  getCategories,
  categories,
  notifications,
  get_search_publications,
}) {
  const location_ = useLocation();
  const searchParams = new URLSearchParams(location_.search);
  const initialSearchTerm = searchParams.get("query") || "";
  const initialCategoryId = searchParams.get("category_id") || 0;
  const initialLocation = searchParams.get("location") || "";
  const initialOrder = searchParams.get("order") || "";
  const navigate = useNavigate();
  const [notificationLength, setNotificationLength] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [render, setRender] = useState(false);
  const [formData, setFormData] = useState({
    category_id: initialCategoryId,
    search: initialSearchTerm,
    location: initialLocation,
    order: initialOrder,
  });
  const { category_id, search, location, order } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    get_search_publications(search, 1, category_id, location, order);
    setRender(!render);

    if (!render) {
      navigate(
        `/search?query=${search}&category_id=${category_id}&location=${location}&order=${order}`
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      get_notifications();
    }
  }, [isAuthenticated, update]);

  useEffect(() => {
    if (notifications !== null) setNotificationLength(notifications?.length);
  }, [notifications, update]);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setAuthReady(true);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const authLinks = authReady && notificationLength !== null && (
    <div className="flex items-center">
      <Link to="/notifications" className="mx-4 inline-block relative">
        <BellIcon className="h-7 w-7 text-gray-600" />
        <span className="absolute top-0 right-0 -mt-1 -mr-2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">
          {notificationLength}
        </span>
      </Link>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full rounded-full  text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
              {profile?.profile_image ? (
                <img
                  className="h-full w-full text-gray-300"
                  src={`${backend_url}${profile?.profile_image}`}
                  alt="Profile"
                />
              ) : (
                <svg
                  className="h-full w-full text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </span>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/profile/${user?.id}`}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Ver mi perfil
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/add_publication"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Publicar
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/user_publications"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Editar Publicaciones
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full text-left px-4 py-2 text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );

  const guestLinks = authReady && (
    <Fragment>
      <Link
        to="/login"
        className="text-base font-medium text-gray-500 hover:text-gray-900"
      >
        Acceder
      </Link>
      <Link
        to="/signup"
        className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Registrarse
      </Link>
    </Fragment>
  );

  return (
    <>
      <Popover className="relative bg-white">
        <div
          className="absolute inset-0 shadow z-30 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-2 md:justify-start md:space-x-10">
            <div>
              <Link to="/" className="flex">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://icons.veryicon.com/png/o/miscellaneous/mirror-icon/swap-8.png"
                  alt=""
                />
              </Link>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
              <Popover.Group as="nav" className="space-x-10 flex items-center">
                <Link
                  to="/swap"
                  className="text-base font-bold text-gray-700 hover:text-gray-900"
                >
                  Swap
                </Link>

                <SearchBox
                  order={order}
                  search={search}
                  category_id={category_id}
                  location={location}
                  onChange={onChange}
                  onSubmit={onSubmit}
                  categories={categories}
                />
                {user?.is_staff && (
                  <Link
                    to="/admin"
                    className="text-base font-bold text-gray-700 hover:text-gray-900"
                  >
                    Admin
                  </Link>
                )}
              </Popover.Group>
              <div className="flex items-center md:ml-12">
                {isAuthenticated ? authLinks : guestLinks}
              </div>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5 sm:pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://icons.veryicon.com/png/o/miscellaneous/mirror-icon/swap-8.png"
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/swap"
                    className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Intercambiar
                  </Link>
                </div>
                <div className="mt-6">
                  <Link
                    to="/signup"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Registrarse
                  </Link>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    Ya esta registrado?{" "}
                    <Link
                      to="/login"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Acceder
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <Alert />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    categories: state.Categories.categories,
    notifications: state.Notifications.notifications,
    profile: state.Profile.ownerProfile,
  };
};

export default connect(mapStateToProps, {
  logout,
  getCategories,
  get_search_publications,
  get_notifications,
})(Navbar);
