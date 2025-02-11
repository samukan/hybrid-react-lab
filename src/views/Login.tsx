import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-white">
      <div className="w-full max-w-md">
        {displayRegister ? (
          <RegisterForm />
        ) : (
          <LoginForm toggleRegister={toggleRegister} />
        )}
      </div>
      <button
        onClick={toggleRegister}
        className="mt-4 rounded bg-stone-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-stone-700"
      >
        or {displayRegister ? 'login' : 'register'}?
      </button>
    </div>
  );
};

export default Login;
