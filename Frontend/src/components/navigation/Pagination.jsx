import React, { useEffect, useState } from "react";

const Pagination = ({ search, active, visitPage, previous, next }) => {
  const totalPages = Math.ceil(search.meta.count / 12);

  if (totalPages <= 1) {
    return null; // No renderizar la paginación si solo hay una página
  }

  const handlePageClick = (pageNumber) => {
    visitPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <div
          key={i}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold" cursor-pointer ${
            active === i
              ? "z-10 bg-teal-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
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
    <div className="m-4 flex items-center justify-center mt-10 pt-10">
      <div
        onClick={previous}
        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
      >
        <span class="sr-only">Previous</span>
        <svg
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      {renderPageNumbers()}
      <div
        onClick={next}
        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
      >
        <span class="sr-only">Next</span>
        <svg
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
