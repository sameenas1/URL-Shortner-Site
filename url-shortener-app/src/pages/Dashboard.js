import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import { logout } from "../redux/authSlice";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const handleLogout = () => {
  dispatch(logout());
  navigate("/", { replace: true }); 
};

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <header className="d-flex justify-content-between align-items-center p-3 shadow-sm bg-white">
        <h2 className="m-0">🚀 URL Shortener</h2>
        <div className="d-flex align-items-center gap-3">
          <span className="fw-bold">Welcome, {user?.username || "User"} 👋</span>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="container-fluid flex-grow-1 py-5">
        <div className="row g-4">
          <div className="col-12">
            <div className=" shadow-lg border-0 p-4">
              <h4 className="mb-3">➕ Add a new URL</h4>
              <UrlForm />
            </div>
          </div>

          <div className="col-12">
            <div className=" shadow-lg border-0 p-4">
              <h4 className="mb-3">📋 Your URLs</h4>
              <UrlList />
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-3 bg-white shadow-sm mt-auto">
        <small>© {new Date().getFullYear()} URL Shortener | Built with ❤️ by Sameena</small>
      </footer>
    </div>
  );
}

export default Dashboard;
