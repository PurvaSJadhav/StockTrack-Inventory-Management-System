import React, { createContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin({ email, password });
    localStorage.setItem("token", response.data.token);
    setToken(response.data.token);
  };
  const register = async (name, email, password) => {
    await apiRegister({ name, email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout, loading }}>
            {children}   {" "}
    </AuthContext.Provider>
  );
};

export default AuthContext;
