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
    const savedPage = localStorage.getItem("currentPage");
    const page = savedPage ? parseInt(savedPage, 10) : 1;
    setActive(page);
    get_search_publications("", page);
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
    localStorage.setItem("currentPage", page);
  };

  const previous_number = () => {
    if (previousNumber) {
      get_search_publications("", previousNumber);
      setActive(active - 1);
      window.scrollTo(0, 0);
    }
  };

  const next_number = () => {
    if (nextNumber) {
      
      get_search_publications("", nextNumber);
      setActive(active + 1);
      window.scrollTo(0, 0);
    }
  };

  const showPublications = () => {
    if (
      filtered_publications &&
      filtered_publications !== null &&
      filtered_publications !== undefined &&
      filtered
    ) {
      return filtered_publications.map((publication, index) => (
        <div
          className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3"
          key={index}
        >
          <PublicationCard publication={publication} />
        </div>
      ));
    } else if (
      !filtered &&
      publications &&
      publications !== null &&
      publications !== undefined
    ) {
      return (
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {publications.data.map((publication, index) => (
            <PublicationCard key={index} publication={publication} />
          ))}
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div>
          

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-16 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-bold tracking-tight text-gray-700 dark:text-gray-400">
                Publicaciones
              </h1>
              
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Publicaciones
              </h2>

              <div>
                {/* Filters */}

                {/* Product grid */}

                {/* Replace with your content */}
                {publications && showPublications()}
                {/* /End replace */}
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
