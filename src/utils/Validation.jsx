export function validateUsername(name) {
  const regex = /^[A-Za-z]+$/;
  if (!regex.test(name)) {
    return "name can only contain letters.";
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
