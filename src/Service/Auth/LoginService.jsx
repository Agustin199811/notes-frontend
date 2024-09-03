import axios from "axios";

const API_URL = "http://localhost:8080";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to login');
    }
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data; 
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data || 'Failed to register');
    } else {
      throw new Error('Failed to register');
    }
  }
};

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${API_URL}/logout`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    localStorage.removeItem('token');
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to logout');
    }
  }
};


export const forgotPassword = (email) => {
    return axios.post(`${API_URL}/users/forgot-password`, null, {
        params: { email }
    });
};

export const resetPassword = (token, newPassword) => {
    return axios.post(`${API_URL}/users/reset-password`, null, {
        params: { token, newPassword }
    });
};

export const validateResetToken = (token) => {
  return axios.get(`${API_URL}/users/validate-reset-token`, {
    params: { token }
  });
};
