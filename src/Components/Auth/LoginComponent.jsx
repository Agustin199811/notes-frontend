import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useAuth from "../../Hooks/useAuth";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }); // Usamos la función login del contexto
      navigate("/notes");
    } catch (error) {
      setError(error.message || "Failed to login");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card" style={{ width: "28rem" }}>
        <div className="card-body">
          {/* Pills navs */}
          <ul
            className="nav nav-pills nav-justified mb-3"
            id="ex1"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <HashLink
                className="nav-link  bg-dark active"
                id="tab-login"
                data-mdb-toggle="pill"
                to="/login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >
                <FaUser className="me-1"/>Login
              </HashLink>
            </li>
            <li className="nav-item" role="presentation">
              <HashLink
                className="nav-link"
                id="tab-register"
                data-mdb-toggle="pill"
                to="/register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
              >
                <FaSignOutAlt className="me-1"/>Register
              </HashLink>
            </li>
          </ul>
          {/* Pills navs */}

          {/* Pills content */}
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="tab-login"
            >
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-3">
                  <p>Sign in with:</p>
                </div>

                {/* Error message */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="loginName"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="loginName">
                    Email
                  </label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="loginPassword"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="loginPassword">
                    Password
                  </label>
                </div>

                {/* Submit button */}
                <div className="text-center">
                  <button type="submit" className="btn btn-dark btn-block mb-4">
                    Sign in
                  </button>
                </div>

                {/* Register link */}
                <div className="text-center">
                  <p>
                    Not a member? <Link to="/register">Register</Link>
                  </p>
                </div>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-register"
              role="tabpanel"
              aria-labelledby="tab-register"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
