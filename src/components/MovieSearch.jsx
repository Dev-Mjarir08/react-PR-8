import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaTimes } from "react-icons/fa";
import { searchMovies, clearSearchResults } from "../features/movieSlice";
import MovieList from "./MovieList";

const MovieSearch = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");

  // Single useSelector destructuring all state properties at once
  const { searchResults, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchData.trim()) {
        dispatch(searchMovies({ query: searchData, page: 1 }));
      } else {
        dispatch(clearSearchResults());
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchData, dispatch]);

  const handleInputChange = (e) => {
    setSearchData(e.target.value);
  };

  const handlePageChange = (page) => {
    if (searchData.trim()) {
      dispatch(searchMovies({ query: searchData, page }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="card bms-search-card p-4">
            <h3 className="text-center mb-3 fw-bold text-dark d-flex align-items-center justify-content-center gap-2">
              <FaSearch className="text-danger" /> Search Movies & Shows
            </h3>
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg bms-search-input"
                placeholder="Search for movies by name (e.g. Avatar, Batman, Deadpool)..."
                value={searchData}
                onChange={handleInputChange}
                autoFocus
              />
              {searchData && (
                <button
                  className="btn btn-outline-secondary d-flex align-items-center gap-1"
                  type="button"
                  onClick={() => {
                    setSearchData("");
                    dispatch(clearSearchResults());
                  }}
                >
                  <FaTimes /> Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {searchData.trim() ? (
        <div>
          <h4 className="mb-4 text-dark fw-bold">
            Search Results for: <span style={{ color: "#f84464" }}>"{searchData}"</span>
          </h4>
          <MovieList
            movies={searchResults}
            loading={loading}
            error={error}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) : (
        <div className="text-center py-5 text-muted">
          <h5>Type a movie name above to discover movies instantly.</h5>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
