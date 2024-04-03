import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex items-center justify-center mt-7 gap-7 ">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <div
              className=" w-10 page-link bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded "
              onClick={() => paginate(number)}
            >
              {number}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
