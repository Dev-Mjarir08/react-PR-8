import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="mb-3 text-dark fw-bold">Page Not Found</h2>
      <p className="lead text-muted mb-4">
        We couldn't find the page you were looking for.
      </p>
      <Link to="/" className="btn btn-bms-red fw-bold px-4 py-2">
        Return to Movies
      </Link>
    </div>
  );
};

export default NotFound;
