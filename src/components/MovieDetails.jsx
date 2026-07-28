import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft, FaStar, FaHeart, FaTicketAlt } from "react-icons/fa";
import { fetchMovieDetails, addFavorite, removeFavorite } from "../features/movieSlice";
import { IMAGE_BASE_URL, BACKDROP_BASE_URL } from "../api/apiInstance";

const FALLBACK_POSTER = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=80";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Single useSelector destructuring all required state properties
  const { movieDetails, loading, error, favorites } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center">
        <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted fw-medium mb-0">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center shadow-sm" role="alert">
          {error}
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-outline-secondary d-inline-flex align-items-center gap-2" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
        </div>
      </div>
    );
  }

  if (!movieDetails) {
    return null;
  }

  const isFavorite = favorites.some((item) => item.id === movieDetails.id);

  // Simple if-else logic using BACKDROP_BASE_URL & IMAGE_BASE_URL from apiInstance
  let backdropUrl = null;
  if (movieDetails.backdrop_path) {
    backdropUrl = BACKDROP_BASE_URL + movieDetails.backdrop_path;
  }

  let posterUrl = FALLBACK_POSTER;
  if (movieDetails.poster_path) {
    posterUrl = IMAGE_BASE_URL + movieDetails.poster_path;
  }

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movieDetails.id));
    } else {
      dispatch(addFavorite(movieDetails));
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_POSTER;
  };

  return (
    <div className="container py-4">
      <button className="btn btn-outline-dark mb-3 fw-medium d-inline-flex align-items-center gap-2" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Movies
      </button>

      {/* BookMyShow Style Movie Banner */}
      <div
        className="card bms-details-banner text-white shadow-lg overflow-hidden border-0"
        style={{
          backgroundImage: backdropUrl
            ? `linear-gradient(to right, rgba(26, 26, 36, 0.95) 25%, rgba(26, 26, 36, 0.75) 60%, rgba(26, 26, 36, 0.95)), url(${backdropUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="row g-0 p-4 p-md-5 align-items-center">
          <div className="col-md-4 text-center mb-4 mb-md-0 d-flex justify-content-center align-items-center">
            <img
              src={posterUrl}
              alt={movieDetails.title}
              onError={handleImageError}
              className="img-fluid rounded-3 shadow-lg"
              style={{
                height: "440px",
                width: "100%",
                maxWidth: "300px",
                objectFit: "cover",
                objectPosition: "top center",
                border: "2px solid rgba(255,255,255,0.15)",
              }}
            />
          </div>

          <div className="col-md-8 ps-md-4">
            <h1 className="display-5 fw-bold text-white mb-2">
              {movieDetails.title}
            </h1>
            {movieDetails.tagline && (
              <p className="fst-italic text-light opacity-75 mb-3 fs-6">
                "{movieDetails.tagline}"
              </p>
            )}

            {/* BookMyShow Rating Card */}
            <div className="bms-rating-box d-flex align-items-center justify-content-between mb-3 me-md-4" style={{ maxWidth: "420px" }}>
              <div className="d-flex align-items-center gap-2">
                <FaStar className="fs-4 text-warning" />
                <div>
                  <span className="fw-bold fs-5 text-white">
                    {movieDetails.vote_average?.toFixed(1)}/10
                  </span>
                  <span className="d-block text-secondary extra-small" style={{ fontSize: "0.75rem" }}>
                    {movieDetails.vote_count ? `${(movieDetails.vote_count / 1000).toFixed(1)}K+ Votes` : "User Rating"}
                  </span>
                </div>
              </div>

              <button
                className={`btn btn-sm d-inline-flex align-items-center justify-content-center gap-2 px-3 py-1.5 ${
                  isFavorite ? "btn-danger" : "btn-light text-dark fw-bold"
                }`}
                onClick={handleFavoriteToggle}
              >
                <FaHeart className={isFavorite ? "text-white" : "text-dark"} />
                {isFavorite ? "Favorited" : "Add to Favorites"}
              </button>
            </div>

            {/* Formats & Languages */}
            <div className="mb-3 d-flex flex-wrap gap-2 align-items-center">
              <span className="badge bg-light text-dark fw-bold px-2.5 py-1.5">2D, 3D, IMAX 3D</span>
              <span className="badge bg-light text-dark text-uppercase fw-bold px-2.5 py-1.5">
                {movieDetails.original_language}
              </span>
              {movieDetails.genres?.map((genre) => (
                <span key={genre.id} className="badge bg-secondary opacity-75 px-2.5 py-1.5">
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Metadata pills */}
            <div className="d-flex flex-wrap gap-4 text-light mb-4 fs-6 align-items-center">
              <div>
                <span className="text-secondary d-block small">Runtime</span>
                <span className="fw-bold">{movieDetails.runtime} min</span>
              </div>
              <div>
                <span className="text-secondary d-block small">Release Date</span>
                <span className="fw-bold">{movieDetails.release_date}</span>
              </div>
              <div>
                <span className="text-secondary d-block small">Popularity</span>
                <span className="fw-bold">{movieDetails.popularity?.toFixed(0)}</span>
              </div>
            </div>

            <h5 className="fw-bold text-white mb-2">About the Movie</h5>
            <p className="text-light opacity-90 fs-6 mb-4">{movieDetails.overview}</p>

            <button
              className="btn btn-bms-red btn-lg px-5 py-2.5 fw-bold shadow-lg d-inline-flex align-items-center justify-content-center gap-2"
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? <FaHeart /> : <FaTicketAlt />}
              {isFavorite ? "Remove Favorite" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
