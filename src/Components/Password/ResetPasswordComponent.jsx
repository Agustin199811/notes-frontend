import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../Service/Auth/LoginService";
import {
  validateConfirmPassword,
  validatePassword,
} from "../../utils/Validation";

export default function ResetPasswordComponent() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    const passwordError = validatePassword(newPassword);
    const confirmPasswordError = validateConfirmPassword(
      newPassword,
      confirmPassword
    );

    if (passwordError || confirmPasswordError) {
      setError(passwordError || confirmPasswordError);
      return;
    }

    try {
      await resetPassword(token, newPassword);
      navigate("/login", {
        state: { message: "Password has been reset successfully." },
      });
    } catch (error) {
      setError(error.message || "Failed to reset password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card" style={{ width: "28rem" }}>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <p>Enter your new password:</p>
            </div>

            {/* Error message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* New Password input */}
            <div className="form-outline mb-4">
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="newPassword">
                New Password
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
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
