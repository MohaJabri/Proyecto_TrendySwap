import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { FilterIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categories";
import { get_publications, get_search_publications } from "../../redux/actions/publications";
import { get_filtered_publications } from "../../redux/actions/publications";
import PublicationCard from "../../components/publication/PublicationCard";
import Layout from "../../hocs/Layout";
import Pagination from "../../components/navigation/Pagination";

const Search = ({
  get_search_publications,
  filtered_publications,
  search_publications,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [previousNumber, setPreviousNumber] = useState(0);
  const [nextNumber, setNextNumber] = useState(0);
  const [active, setActive] = useState(1);

  
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    const page = savedPage ? parseInt(savedPage, 10) : 1;
    setActive(page);
    
  }, []);

  useEffect(() => {
    if (search_publications?.meta) {
      setPreviousNumber(search_publications.meta.previous);
      setNextNumber(search_publications.meta.next);
    }
  }, [search_publications]);

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
      search_publications &&
      search_publications !== null &&
      search_publications !== undefined
    ) {
      return (
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
          {search_publications.data.map((publication, index) => (
            <PublicationCard key={index} publication={publication} />
          ))}
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-16 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-bold tracking-tight text-gray-700 dark:text-gray-400">
                Resultados de la búsqueda:
              </h1>

              
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}

                {/* Product grid */}
                <div className="lg:col-span-4">
                  {/* Replace with your content */}
                  {search_publications && showPublications()}
                  {/* /End replace */}
                </div>
              </div>
              {search_publications?.data?.length > 0 && (
                <Pagination
                  search={search_publications}
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
  publications: state.Publications.publications,
  filtered_publications: state.Publications.filtered_publications,
  search_publications: state.Publications.search_publications,
});
export default connect(mapStateToProps, {
  get_search_publications
  
})(Search);
