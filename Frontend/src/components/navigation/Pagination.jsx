import React, { useEffect, useState } from "react";
const Pagination = ({ search, active, visitPage, previous, next }) => {
  const totalPages = Math.ceil(search.meta.count / 9);

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
