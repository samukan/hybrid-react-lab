import {User, UserWithNoPassword} from 'hybrid-types/DBTypes';

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
  handleAutoLogin: () => void;
};

export type {
  Credentials,
  RegisterCredentials,
  RegistrationResponse,
  AuthContextType,
};
