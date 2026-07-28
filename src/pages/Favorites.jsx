import React from "react";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import MovieList from "../components/MovieList";

const Favorites = () => {
  const favorites = useSelector((state) => state.movies.favorites);

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <h2 className="main-title mb-1 d-flex align-items-center justify-content-center gap-2">
          <FaHeart className="text-danger" /> My Favorites List
        </h2>
        <p className="text-muted small">Your saved movies and watchlist</p>
      </div>

      {favorites.length === 0 ? (
        <div className="alert alert-light border text-center py-5 shadow-sm" role="alert">
          <h5 className="text-dark fw-bold mb-2">No favorite movies added yet!</h5>
          <p className="text-muted mb-0">
            Explore movies on the Home page and click <FaHeart className="text-dark mx-1" /> Favorite to add them to your collection.
          </p>
        </div>
      ) : (
        <MovieList movies={favorites} loading={false} error={null} />
      )}
    </div>
  );
};

export default Favorites;
