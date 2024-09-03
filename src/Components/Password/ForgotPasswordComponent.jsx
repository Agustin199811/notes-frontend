import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../Service/Auth/LoginService";
import { Link } from "react-router-dom";

export default function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      //alert("Password reset link sent to your email.");
      navigate("/login", {
        state: { message: "Password reset link sent to your email." },
      });
    } catch (error) {
      setError(error.message || "Failed to send password reset link");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card" style={{ width: "28rem" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <p>Enter your email to reset your password:</p>
            </div>

            {/* Error message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Email input */}
            <div className="form-outline mb-4">
              <input
                type="email"
                id="forgotEmail"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="forgotEmail">
                Email
              </label>
            </div>

            {/* Submit button */}
            <div className="text-center">
              <button type="submit" className="btn btn-dark btn-block mb-4">
                Send Reset Link
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link to="/login" className="btn btn-dark btn-block mb-4">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
