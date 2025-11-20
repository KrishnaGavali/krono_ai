"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
}

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  setIsAuth: (value: boolean) => void;
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    console.log("Logging in user:", userData);
    setUser(userData);
    setIsAuth(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth, user, setIsAuth, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
