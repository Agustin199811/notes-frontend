import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { registerUser } from "../../Service/Auth/LoginService";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { validateConfirmPassword, validatePassword, validateUsername } from "../../utils/Validation";

export default function RegisterComponent() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    const usernameError = validateUsername(username);
    //const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(
      password,
      confirmPassword
    );

    if (usernameError || passwordError || confirmPasswordError) {
      setError(
        usernameError || passwordError || confirmPasswordError
      );
      return;
    }

    try {
      await registerUser({ username, email, password });
      navigate("/login");
    } catch (error) {
      setError(error.message || "Failed to register");
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
                className="nav-link"
                id="tab-login"
                data-mdb-toggle="pill"
                to="/login"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >
                <FaUser className="me-1" />
                Login
              </HashLink>
            </li>
            <li className="nav-item" role="presentation">
              <HashLink
                className="nav-link bg-dark active"
                id="tab-register"
                data-mdb-toggle="pill"
                to="/register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
              >
                <FaSignOutAlt className="me-1" />
                Register
              </HashLink>
            </li>
          </ul>
          {/* Pills navs */}

          {/* Pills content */}
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="pills-register"
              role="tabpanel"
              aria-labelledby="tab-register"
            >
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-3">
                  <p>Sign up with:</p>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                {/* Username input */}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="registerUsername"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="registerUsername">
                    Username
                  </label>
                </div>

                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="registerEmail"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="registerEmail">
                    Email
                  </label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="registerPassword"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="registerPassword">
                    Password
                  </label>
                </div>

                {/* Confirm Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                </div>

                {/* Submit button */}
                <div className="text-center">
                  <button type="submit" className="btn btn-dark btn-block mb-4">
                    Sign up
                  </button>
                </div>

                {/* Login link */}
                <div className="text-center">
                  <p>
                    Already a member? <Link to="/login">Login</Link>
                  </p>
                </div>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="tab-login"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
