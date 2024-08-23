// AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../Service/Auth/LoginService";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = async (credentials) => {
    try {
      await loginUser(credentials); // Llama al servicio de autenticación
      setIsAuthenticated(true); // Actualiza el estado de autenticación
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser(); // Llama al servicio de cierre de sesión
      setIsAuthenticated(false); // Actualiza el estado de autenticación
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
