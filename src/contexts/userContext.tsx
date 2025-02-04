import React, {createContext, useState, useEffect} from 'react';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {AuthContextType, Credentials} from '../types/LocalTypes';
import {useNavigate, useLocation} from 'react-router';
import {UserWithNoPassword} from 'hybrid-types/DBTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (credentials: Credentials) => {
    try {
      const loginResponse = await postLogin(credentials);
      const token = loginResponse.token;
      localStorage.setItem('token', token);
      const userData = await getUserByToken(token);
      setUser(userData.user);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await getUserByToken(token);
        setUser(userData.user);
        const origin = location.state?.from?.pathname || '/';
        navigate(origin);
      }
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{user, handleLogin, handleLogout, handleAutoLogin}}
    >
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
