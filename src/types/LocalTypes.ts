import {User, UserWithNoPassword} from 'hybrid-types/DBTypes';

<<<<<<< HEAD
export type Credentials = Pick<User, 'username' | 'password'>;
export type RegisterCredentials = Pick<User, 'username' | 'password' | 'email'>;

export type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
=======
type Credentials = Pick<User, 'username' | 'password'>;
type RegisterCredentials = Pick<User, 'username' | 'password' | 'email'>;

type RegistrationResponse = {
  message: string;
  user: {
    user_id: number;
    username: string;
    email: string;
    created_at: string;
    level_name: string;
  };
};

type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials) => void;
  handleLogout: () => void;
  loading: boolean;
};

export type {
  Credentials,
  RegisterCredentials,
  RegistrationResponse,
  AuthContextType,
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
};
