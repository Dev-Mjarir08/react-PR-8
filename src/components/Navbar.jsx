import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaFilm } from "react-icons/fa";
import { logout } from "../features/movieSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Single useSelector destructuring all required state properties
  const { user, favorites } = useSelector((state) => state.movies);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bms-navbar sticky-top">
      <div className="container">
        <Link className="navbar-brand bms-brand d-inline-flex align-items-center gap-2" to="/">
          <FaFilm className="text-danger fs-3" />
          <span className="fw-extrabold">book<span className="bms-brand-highlight">my</span>show</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#bmsNavbar"
          aria-controls="bmsNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="bmsNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 align-items-lg-center">
            <li className="nav-item">
              <NavLink className="nav-link bms-nav-link" to="/" end>
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link bms-nav-link d-inline-flex align-items-center position-relative" to="/favorites">
                Favorites
                {favorites.length > 0 && (
                  <span className="badge bg-danger text-light ms-2 rounded-pill px-2 py-1 fs-7">
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center ms-auto">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="text-light fw-medium">
                  Hi, {user.name || user.email}
                </span>
                <button
                  className="btn btn-bms-outline btn-sm px-3 py-1"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link className="btn btn-bms-red btn-sm px-4 py-1.5 fw-bold" to="/login">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
