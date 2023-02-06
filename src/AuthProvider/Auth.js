/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  let location = useLocation();

  const areYouLoggedIn = () => {
    let user = window.localStorage.getItem("user");
    if (user) {
      return true;
    } else {
      return false;
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(areYouLoggedIn);

  const getOnline = () => {
    if(isLoggedIn) {
        return window.localStorage.getItem('user');
    }
  }

  const [userOnline, setuserOnline] = useState(getOnline);
  const [userData, setUserData] = useState([]);

  const login = email => {
    window.localStorage.setItem("user", email);
    setIsLoggedIn(true);
    <Navigate to="/" replace={true} />
  };

  const logout = () => {
    window.localStorage.removeItem("user");
    setIsLoggedIn(false);
    <Navigate to="/login" replace={true} />
  };

  const getUserData = () => {
    if(isLoggedIn) {
        axios.post('https://www.auth.grandapihub.org.ng/api/user',  {email: userOnline})
            .then((res) => {
                setUserData(res.data.user);
            })
    }
  }

  useEffect(
    () => {
      return () => {
        getUserData()
      };
    },
    [location]
  );

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const callAuth = () => {
  return useContext(AuthContext);
};
