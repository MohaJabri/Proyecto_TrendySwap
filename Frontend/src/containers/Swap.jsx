import Layout from "../hocs/Layout";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { FilterIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";

import {
  get_search_publications,
  get_filtered_publications,
} from "../redux/actions/publications";

import PublicationCard from "../components/publication/PublicationCard";
import Pagination from "../components/navigation/Pagination";

const Swap = ({
  categories,
  get_search_publications,
  publications,
  get_filtered_publications,
  filtered_publications,
}) => {
  const [previousNumber, setPreviousNumber] = useState(0);
  const [nextNumber, setNextNumber] = useState(0);
  const [active, setActive] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "0",
    sortBy: "created",
    order: "desc",
  });
  const { category_id, sortBy, order } = formData;
  useEffect(() => {
    window.scrollTo(0, 0);
    get_search_publications("", 1);
  }, []);

  useEffect(() => {
    if (publications?.meta) {
      setPreviousNumber(publications.meta.previous);
      setNextNumber(publications.meta.next);
    }
  }, [publications]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    get_filtered_publications(category_id, sortBy, order);
    setFiltered(true);
  };

  const visitPage = (page) => {
    get_search_publications("", page);
    setActive(page);
  };

  const previous_number = () => {
    if (previousNumber) {
      get_search_publications("", previousNumber);
      setActive(active - 1);
    }
  };

  const next_number = () => {
    if (nextNumber) {
      get_search_publications("", nextNumber);
      setActive(active + 1);
    }
  };

  const showPublications = () => {
    let results = [];
    let display = [];

    if (
      filtered_publications &&
      filtered_publications !== null &&
      filtered_publications !== undefined &&
      filtered
    ) {
      filtered_publications.map((publication, index) => {
        return display.push(
          <div key={index}>
            <PublicationCard publication={publication} />
          </div>
        );
      });
    } else if (
      !filtered &&
      publications &&
      publications !== null &&
      publications !== undefined
    ) {
      publications.data.map((publication, index) => {
        return display.push(
          <div key={index}>
            <PublicationCard publication={publication} />
          </div>
        );
      });
    }

    for (let i = 0; i < display.length; i += 4) {
      results.push(
        <div key={i} className="grid md:grid-cols-4 ">
          {display[i] ? display[i] : <div className=""></div>}
          {display[i + 1] ? display[i + 1] : <div className=""></div>}
          {display[i + 2] ? display[i + 2] : <div className=""></div>}
          {display[i + 3] ? display[i + 3] : <div className=""></div>}
        </div>
      );
    }

    return results;
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/*Mobil Filters */}
                  <form
                    onSubmit={(e) => onSubmit(e)}
                    className="mt-4 border-t border-gray-200"
                  >
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="font-medium text-gray-900 px-2 py-3"
                    >
                      {categories?.map((category) => {
                        if (category.subcategories.length === 0) {
                          return (
                            <div
                              key={category.id}
                              className=" flex items-center h-5 my-5"
                            >
                              <input
                                name="category_id"
                                onChange={(e) => onChange(e)}
                                value={category.id.toString()}
                                type="radio"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                              />
                              <label className="block px-2 py-3">
                                {category.name}
                              </label>
                            </div>
                          );
                        } else {
                          let result = [];
                          result.push(
                            <div
                              key={category.id}
                              className="flex items-center h-5"
                            >
                              <input
                                name="category_id"
                                type="radio"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                              />
                              <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                {category.name}
                              </label>
                            </div>
                          );

                          category.subcategories.map((subcategory) => {
                            result.push(
                              <div
                                key={subcategory.id}
                                className="flex items-center h-5 ml-2 my-5"
                              >
                                <input
                                  name="category_id"
                                  type="radio"
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded-full"
                                />
                                <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                  {subcategory.name}
                                </label>
                              </div>
                            );
                          });

                          return result;
                        }
                      })}
                    </ul>
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Mas filtros
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              <div className="form-group ">
                                <label
                                  htmlFor="sortBy"
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  Ver por
                                </label>
                                <select
                                  className="my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                  id="sortBy"
                                  name="sortBy"
                                  onChange={(e) => onChange(e)}
                                  value={sortBy}
                                >
                                  <option value="date_created">Fecha</option>

                                  <option value="title">Nombre</option>
                                </select>
                              </div>
                              <div className="form-group">
                                <label
                                  htmlFor="order"
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  Orden
                                </label>
                                <select
                                  className="my-2 font-sofiapro-light inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                                  id="order"
                                  name="order"
                                  onChange={(e) => onChange(e)}
                                  value={order}
                                >
                                  <option value="asc">A - Z</option>
                                  <option value="desc">Z - A</option>
                                </select>
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    <button
                      type="submit"
                      className="float-right m-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Buscar
                    </button>
                  </form>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-16 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FilterIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Publicaciones
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}

                {/* Product grid */}
                <div className="lg:col-span-4">
                  {/* Replace with your content */}
                  {publications && showPublications()}
                  {/* /End replace */}
                </div>
              </div>
              {publications?.data?.length > 0 && (
                <Pagination
                  search={publications}
                  active={active}
                  visitPage={visitPage}
                  previous={previous_number}
                  next={next_number}
                />
              )}
            </section>
          </main>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  categories: state.Categories.categories,
  publications: state.Publications.search_publications,
  filtered_publications: state.Publications.filtered_publications,
});
export default connect(mapStateToProps, {
  get_search_publications,
  get_filtered_publications,
})(Swap);
