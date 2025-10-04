import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-dark bg-dark px-4"
      style={{
        height: "80px", 
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
      }}
    >
    <Link
      to="/"
      className="navbar-brand"
      style={{
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#ffffff", 
        textDecoration: "none",
      }}
    >
      🚀 URL Shortener
    </Link>

      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/signup" className="btn btn-outline-light me-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-success">
              Login
            </Link>
          </>
        ) : (
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
