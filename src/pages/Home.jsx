import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaTimes } from "react-icons/fa";
import { fetchPopularMovies, searchMovies, clearSearchResults } from "../features/movieSlice";
import MovieList from "../components/MovieList";

const Home = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");

  // Single useSelector destructuring all state properties at once
  const { popularMovies, searchResults, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.movies
  );

  const isSearching = searchData.trim().length > 0;
  const currentMovies = isSearching ? searchResults : popularMovies;

  useEffect(() => {
    dispatch(fetchPopularMovies(1));
  }, [dispatch]);

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

  const handlePageChange = (page) => {
    if (searchData.trim()) {
      dispatch(searchMovies({ query: searchData, page }));
    } else {
      dispatch(fetchPopularMovies(page));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container py-4">
      {/* Integrated Main Page Search Bar - Perfectly Centered */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-sm p-1 bg-white rounded-3">
            <div className="input-group input-group-lg align-items-center">
              <span className="input-group-text bg-white border-0 text-muted fs-5 pe-1 d-flex align-items-center justify-content-center">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control border-0 bms-search-input fs-6 shadow-none py-2"
                placeholder="Search movies by title (e.g. Avatar, Batman, Avengers)..."
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
              {searchData && (
                <button
                  className="btn btn-link text-secondary text-decoration-none border-0 d-inline-flex align-items-center gap-1 pe-3"
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

      {/* Main Page Title Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="main-title mb-1 fw-bold text-dark">
            {isSearching ? `Search Results for "${searchData}"` : "Recommended Movies"}
          </h2>
          <p className="text-muted small mb-0">
            {isSearching
              ? `Showing results from TMDb (Page ${currentPage} of ${totalPages})`
              : `Explore latest popular releases (Page ${currentPage} of ${totalPages})`}
          </p>
        </div>
      </div>

      {/* Movie Grid */}
      <MovieList
        movies={currentMovies}
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
