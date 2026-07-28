import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Favorites from "./pages/Favorites";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import "./App.css";

const App = () => {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f5f5f7" }}>
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="py-4 border-top mt-auto" style={{ backgroundColor: "#333545", color: "#cccccc" }}>
        <div className="container text-center">
          <p className="mb-1 fw-bold text-white fs-5">
            book<span style={{ color: "#f84464" }}>my</span>show
          </p>
          <small>© 2026 Movie Library. Inspired by BookMyShow layout & powered by TMDb API.</small>
        </div>
      </footer>
    </div>
  );
};

export default App;
