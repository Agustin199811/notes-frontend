export function validateUsername(username) {
  const regex = /^[A-Za-z0-9]+$/;
  if (!regex.test(username)) {
    return "Username can only contain letters and numbers.";
  }
  return null;
}

// Password validation: must be between 4 and 16 characters long
export function validatePassword(password) {
  if (password.length < 4 || password.length > 16) {
    return "Password must be between 4 and 16 characters long.";
  }
  return null;
}

// Confirm password validation: must match the password
export function validateConfirmPassword(password, confirmPassword) {
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  return null;
}
