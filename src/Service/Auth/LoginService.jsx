import axios from "axios";

const API_URL = "http://localhost:8080";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('token', response.data.token);

    return {user: response.data.user}
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



export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/users/forgot-password`, null, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    if (error.response.data) {
      throw new Error(error.response.data);
    } 
  }
};



export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/users/reset-password`, null, {
      params: { token, newPassword },
    });
    return response.data;
  } catch (error) {
    if (error.response.data) {
      throw new Error(error.response.data);
    }
  }
};


export const validateResetToken = (token) => {
  return axios.get(`${API_URL}/users/validate-reset-token`, {
    params: { token }
  });
};


export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_URL}/users/delete`, {
      params: { userId },
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });
    localStorage.removeItem('token'); // Elimina el token después de eliminar la cuenta
    return "User account has been deleted successfully.";
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to delete user');
    }
  }
};


export const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API_URL}/users/me`, {
      headers: { "Authorization": `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error; 
  }
};

