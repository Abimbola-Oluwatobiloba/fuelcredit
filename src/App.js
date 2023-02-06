// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './AuthProvider/Auth';
import { RequireAuth } from './AuthProvider/RequireAuth';
import { NoAuth } from './AuthProvider/NoAuth';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route 
            exact 
            path='/' 
            element={
              <>
                <RequireAuth>
                  <Home />
                </RequireAuth>
              </>
            } 
          />

          <Route 
            exact 
            path='login' 
            element={
              <>
                <NoAuth>
                  <Login />
                </NoAuth>
              </>
            } 
          />
          <Route 
            exact 
            path='register' 
            element={
              <>
                <NoAuth>
                  <Register />
                </NoAuth>
              </>
            } 
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
