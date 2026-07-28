import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { login } from "../features/movieSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.movies.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      dispatch(login({ name: formData.name || formData.email.split("@")[0], email: formData.email }));
      navigate("/");
    }
  };

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm p-4 bg-white border-0 rounded-3">
            <div className="text-center mb-4">
              <h3 className="fw-bold text-dark mb-1 d-flex align-items-center justify-content-center gap-2">
                <FaLock className="text-danger" /> Sign In
              </h3>
              <p className="text-muted small">Sign in to manage your favorite movies</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-dark fw-medium">Full Name (Optional)</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-dark fw-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-dark fw-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-bms-red w-100 fw-bold py-2 shadow-sm">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
