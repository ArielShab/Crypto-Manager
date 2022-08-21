import React, { useContext, useState } from "react";
import usersService from "../services/usersService";

const authContext = React.createContext(null);
authContext.displayName = "Provider";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(usersService.getUser());

  const refreshUser = () => {
    setUser(usersService.getUser());
  };

  const createUser = (body) => {
    return usersService.createUser(body);
  };
  const login = async (body) => {
    const response = await usersService.loginUser(body);
    refreshUser();
    return response;
  };
  const logout = () => {
    usersService.logout();
    refreshUser();
  };

  return (
    <authContext.Provider value={{ user, createUser, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(authContext);
};
