import React, { createContext, useState, useEffect } from "react";
import { fetchUserData, loginUser, logoutUser } from "../Service/Auth/LoginService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar la aplicación
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (token) {
      fetchUser(); // Obtener los datos del usuario cuando hay un token
    }
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await fetchUserData(); // Usa el servicio para obtener datos del usuario
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setIsAuthenticated(false); // En caso de error, asegúrate de que el estado de autenticación esté correcto
      setUser(null);
    }
  };

  const login = async (credentials) => {
    try {
      await loginUser(credentials); // Llama al servicio de autenticación
      setIsAuthenticated(true); // Actualiza el estado de autenticación
      await fetchUser();
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser(); // Llama al servicio de cierre de sesión
      setIsAuthenticated(false); // Actualiza el estado de autenticación
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
