import React from 'react'
import { callAuth } from './Auth'
import { Navigate } from 'react-router-dom';

export const RequireAuth = ({ children}) => {
    const auth = callAuth();

    if(!auth.isLoggedIn) {
        return <Navigate to="/login" />
    }
  return children
}