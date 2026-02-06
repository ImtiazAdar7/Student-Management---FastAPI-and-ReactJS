import { createContext, useState, useEffect } from "react";
import { getProfile } from "../api/api";
import API from "../api/api"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("access_token");
    }
  };

  const logout = () => {
  localStorage.removeItem("access_token");
  delete API.defaults.headers.common["Authorization"];
  setUser(null);
};

  useEffect(() => {
    if (localStorage.getItem("access_token")) fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
