import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, loading, error, currentPage = 1, totalPages = 500, onPageChange }) => {
  if (loading) {
    return (
      <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center">
        <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted fw-medium mb-0">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4 shadow-sm" role="alert">
        <strong>Error: </strong> {error}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="alert alert-light border text-center my-4 text-muted" role="alert">
        No movies found.
      </div>
    );
  }

  const current = Number(currentPage) || 1;
  const total = Number(totalPages) > 1 ? Number(totalPages) : 500;

  // Calculate page number list around currentPage (e.g. 5 pages centered around current)
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(1, current - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(total, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div>
      <div className="row g-4 align-items-stretch">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Prominent Main Page Bootstrap Pagination Controls */}
      {onPageChange && (
        <nav className="d-flex flex-column align-items-center justify-content-center mt-5 mb-4 text-center">
          <ul className="pagination pagination-md shadow-sm mb-2 align-items-center">
            <li className={`page-item ${current <= 1 ? "disabled" : ""}`}>
              <button
                type="button"
                className="page-link text-dark fw-bold d-inline-flex align-items-center justify-content-center gap-1 py-2 px-3"
                onClick={() => {
                  if (current > 1) onPageChange(current - 1);
                }}
                disabled={current <= 1}
              >
                <FaChevronLeft style={{ fontSize: "0.75rem" }} /> Prev
              </button>
            </li>

            {pageNumbers.map((page) => (
              <li key={page} className={`page-item ${page === current ? "active" : ""}`}>
                <button
                  type="button"
                  className={`page-link fw-bold py-2 px-3 ${
                    page === current
                      ? "bg-danger border-danger text-white"
                      : "text-dark"
                  }`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            <li className={`page-item ${current >= total ? "disabled" : ""}`}>
              <button
                type="button"
                className="page-link text-dark fw-bold d-inline-flex align-items-center justify-content-center gap-1 py-2 px-3"
                onClick={() => {
                  if (current < total) onPageChange(current + 1);
                }}
                disabled={current >= total}
              >
                Next <FaChevronRight style={{ fontSize: "0.75rem" }} />
              </button>
            </li>
          </ul>

          <span className="text-muted small fw-medium mt-1">
            Page <strong>{current}</strong> of <strong>{total}</strong>
          </span>
        </nav>
      )}
    </div>
  );
};

export default MovieList;
