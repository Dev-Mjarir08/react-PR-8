import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar, FaCalendarAlt } from "react-icons/fa";
import { addFavorite, removeFavorite } from "../features/movieSlice";
import { IMAGE_BASE_URL } from "../api/apiInstance";

const FALLBACK_POSTER = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.movies.favorites);
  const isFavorite = favorites.some((item) => item.id === movie.id);

  // Simple if-else logic using IMAGE_BASE_URL from apiInstance
  let posterUrl = FALLBACK_POSTER;
  if (movie.poster_path) {
    posterUrl = IMAGE_BASE_URL + movie.poster_path;
  }

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const handleViewDetails = () => {
    navigate(`/details/${movie.id}`);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_POSTER;
  };

  return (
    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 d-flex align-items-stretch">
      <div
        className="card w-100 product-card border-0 d-flex flex-column"
        onClick={handleViewDetails}
        style={{ cursor: "pointer" }}
      >
        <div className="image-box position-relative" style={{ backgroundColor: "#222539" }}>
          <img
            src={posterUrl}
            className="card-img-top product-image"
            alt={movie.title || movie.name}
            onError={handleImageError}
            style={{
              height: "350px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />

          <button
            className={`btn btn-sm position-absolute top-0 end-0 m-2 rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm ${
              isFavorite ? "btn-danger" : "btn-light text-dark"
            }`}
            onClick={handleFavoriteClick}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            style={{ width: "34px", height: "34px", fontSize: "0.95rem", zIndex: 2 }}
          >
            {isFavorite ? <FaHeart className="text-white" /> : <FaHeart className="text-dark" />}
          </button>

          <div className="bms-rating-badge d-flex justify-content-between align-items-center">
            <span className="d-inline-flex align-items-center gap-1">
              <FaStar className="text-warning" />
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10
            </span>
            <span className="small text-light opacity-75 d-inline-flex align-items-center gap-1">
              <FaCalendarAlt />
              {movie.release_date ? movie.release_date.slice(0, 4) : "Upcoming"}
            </span>
          </div>
        </div>

        <div className="card-body p-3 d-flex flex-column flex-grow-1">
          <h6
            className="product-title text-truncate mb-2 fw-bold text-dark"
            style={{ fontSize: "0.98rem", lineHeight: "1.3" }}
            title={movie.title || movie.name}
          >
            {movie.title || movie.name}
          </h6>

          <p
            className="product-desc text-muted mb-3 flex-grow-1"
            style={{
              fontSize: "0.82rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "2.4em",
              lineHeight: "1.2em",
            }}
          >
            {movie.overview
              ? movie.overview
              : "No description available for this movie."}
          </p>

          <button
            className="btn btn-bms-red w-100 view-btn mt-auto py-2 d-flex align-items-center justify-content-center"
            onClick={handleViewDetails}
            style={{ fontSize: "0.85rem" }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
