import { Navigate } from 'react-router-dom';
import { callAuth } from './Auth'

export const NoAuth = ({ children}) => {
    const auth = callAuth();

    if(auth.isLoggedIn) {
        return <Navigate to="/login" />
    }
  return children
}