import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // שליפת הטוקן מהלוקל סטורג' אם קיים, כדי לשמור על מצב ההתחברות גם לאחר רענון הדף
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
 // פונקציה להתנתקות - מחיקה של הטוקן מהסטייט ומהלוקל סטורג'
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};