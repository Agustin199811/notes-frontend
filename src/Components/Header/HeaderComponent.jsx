import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FaBook, FaHome, FaDoorClosed, FaUser } from "react-icons/fa";

function HeaderComponent() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <span className="navbar-brand">Navbar</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex flex-row w-100 mb-2 mb-lg-0">
            <div className="d-flex flex-grow-1">
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center active"
                  aria-current="page"
                  to="/"
                >
                  <FaHome className="me-1" /> Home
                </Link>
              </li>
              {isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link d-flex align-items-center"
                      to="/notes"
                    >
                      <FaBook className="me-1" />
                      Notes
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <button
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Action
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/saveNotes">
                          Create Note
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </div>
            <li className="nav-item ms-auto">
              {isAuthenticated ? (
                <button
                  className="nav-link d-flex align-items-center btn btn-link"
                  onClick={handleLogout}
                >
                  <FaDoorClosed className="me-1"/> Logout
                </button>
              ) : (
                <Link
                  className="nav-link d-flex align-items-center"
                  to="/login"
                >
                  <FaUser className="me-1" /> Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;
