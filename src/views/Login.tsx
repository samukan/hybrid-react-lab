<<<<<<< HEAD
import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [displayRegister, setDisplayRegister] = useState(false);

  const toggleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  return (
    <>
      {displayRegister ? <RegisterForm /> : <LoginForm toggleRegister={toggleRegister} />}
      <button onClick={toggleRegister}>
        or {displayRegister ? 'login' : 'register'}?
      </button>
=======
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const login = () => {
  return (
    <>
      <LoginForm />
      <RegisterForm />
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
    </>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default login;
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
