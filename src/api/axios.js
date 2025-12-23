import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">StudyShare</Link>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/posts" className="nav-link">All Posts</Link>

        {isLoggedIn && (
          <>
            <Link to="/make-post" className="nav-link">Make Post</Link>
            <Link to="/my-posts" className="nav-link">My Posts</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </>
        )}

        {!isLoggedIn ? (
          <Link to="/login" className="nav-btn">Login</Link>
        ) : (
          <button onClick={handleLogout} className="nav-btn logout">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
