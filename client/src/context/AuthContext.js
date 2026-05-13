import { createContext, useState } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // שליפת הטוקן מהלוקל סטורג' אם קיים, כדי לשמור על מצב ההתחברות גם לאחר רענון הדף
  const login = (newToken) => {
    setToken(newToken);
    sessionStorage.setItem("token", newToken);
  };
 // פונקציה להתנתקות - מחיקה של הטוקן מהסטייט ומהלוקל סטורג'
  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };
  // פונקציית בדיקה אם הוא מנהל
  const checkIsAdmin = () => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      //id של המנהל
      const adminId = "6a03663b18e73cfca9b191ac"; 
      return decoded._id === adminId; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAdmin: checkIsAdmin() }}>
      {children}
    </AuthContext.Provider>
  );
};