import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { FaBook, FaHome, FaDoorClosed, FaUser, FaTrash } from "react-icons/fa";
import notes from "../../assets/notes.svg";
import { deleteUser } from "../../Service/Auth/LoginService";

function HeaderComponent() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (user && user.id) {
        await deleteUser(user.id);
        console.log("Account deleted, logging out and navigating to /login");
        await logout();
        navigate("/login", {
          state: { message: "Account has been deleted successfully" },
          replace: true
        });
      } else {
        alert("User ID is not available.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <img src={notes} alt="Notes App Logo" width="100" height="40" />
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                <FaHome className="me-1" /> Home
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/notes">
                    <FaBook className="me-1" /> Notes
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Action
                  </a>
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
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              {isAuthenticated ? (
                <>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Session
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={handleDeleteAccount}>
                        <FaTrash className="me-2" /> Delete Account
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <FaDoorClosed className="me-2" /> Logout
                      </button>
                    </li>
                  </ul>
                </>
              ) : (
                <Link className="nav-link" to="/login">
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