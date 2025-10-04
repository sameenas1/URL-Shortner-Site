import React from "react";

function Pagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {
  const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
            Prev
          </button>
        </li>

        {pages.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? "active" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
