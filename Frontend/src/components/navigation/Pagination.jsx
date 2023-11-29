import React, { useEffect, useState } from "react";
const Pagination = ({ searchTerm, search, get_search, active, setActive }) => {
  const [previousNumber, setPreviousNumber] = useState(0);
  const [nextNumber, setNextNumber] = useState(0);
  useEffect(() => {
    setPreviousNumber(search.meta.previous);
    setNextNumber(search.meta.next);
  }, [search]);

  const totalPages = Math.ceil(search.meta.count / 9);
  const visitPage = (page) => {
    get_search(searchTerm, page);
    setActive(page);
  };

  const previous = () => {
    if (previousNumber) {
      get_search(searchTerm, previousNumber);
      setActive(active - 1);
    }
  };

  const next = () => {
    if (nextNumber) {
      get_search(searchTerm, nextNumber);
      setActive(active + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    visitPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div
          key={i}
          className={`py-2 px-3 border border-gray-300 rounded-md cursor-pointer ${
            active === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </div>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <div onClick={previous} className="cursor-pointer">
        Previous
      </div>
      {renderPageNumbers()}
      <div onClick={next} className="cursor-pointer">
        Next
      </div>
    </div>
  );
};

export default Pagination;
