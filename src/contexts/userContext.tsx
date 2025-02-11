// UserContext.tsx
import React, {createContext, useState} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {AuthContextType, Credentials} from '../types/LocalTypes';
import {useLocation, useNavigate} from 'react-router';
import {UserWithNoPassword} from 'hybrid-types/DBTypes';
import {UserResponse} from 'hybrid-types/MessageTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials: Credentials) => {
    try {
      // TODO: post login credentials to API
      const loginResult = await postLogin(credentials);
      console.log('doLogin result', loginResult);
      // TODO: set token to local storage
      if (loginResult) {
        localStorage.setItem('token', loginResult.token);
      }
      // TODO: set user to state
      setUser(loginResult.user);
      // TODO: navigate to home
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleLogout = () => {
    try {
      // TODO: remove token from local storage
      // setItem
      localStorage.removeItem('token');
      // ...or clear
      // localStorage.clear();
      // TODO: set user to null
      setUser(null);
      // TODO: navigate to home
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      // TODO: get token from local storage
      const token = localStorage.getItem('token');
      // TODO: if token exists, get user data from API
      if (!token) {
        return;
      }
      const userResponse: UserResponse = await getUserByToken(token);
      // TODO: set user to state
      setUser(userResponse.user);
      // when page is refreshed, the user is redirected to origin (see ProtectedRoute.tsx)
      const origin = location.state.from.pathname || '/';
      navigate(origin);
    } catch (e) {
      // alert('Token not valid');
      console.log((e as Error).message);
    }
  };

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, UserContext};
