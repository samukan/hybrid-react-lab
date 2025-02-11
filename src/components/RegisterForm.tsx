<<<<<<< HEAD
import {useUser} from "../hooks/apiHooks";
import {useForm} from "../hooks/formHooks";
import {RegisterCredentials} from "../types/LocalTypes";

const RegisterForm = () => {
  const {postRegister} = useUser();
=======
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {useUser} from '../hooks/apiHooks';
import {useForm} from '../hooks/formHooks';
import {RegisterCredentials} from '../types/LocalTypes';
import {useAuthentication} from '../hooks/apiHooks';

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const {postRegister} = useUser();
  const {postLogin} = useAuthentication();

>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

<<<<<<< HEAD
  const doRegister = async () => {
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doLogin result', registerResult);
    } catch (error) {
      console.error((error as Error).message);
      // Display error to user here(?)
=======
  const validateForm = () => {
    if (inputs.username.length < 3) {
      setErrorMessage('Username must be at least 3 characters');
      return false;
    }
    if (inputs.password.length < 5) {
      setErrorMessage('Password must be at least 5 characters');
      return false;
    }
    if (!inputs.email.includes('@')) {
      setErrorMessage('Please enter a valid email');
      return false;
    }
    return true;
  };

  const doRegister = async () => {
    setErrorMessage('');
    if (!validateForm()) {
      return;
    }

    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('Registration successful:', registerResult);

      const loginResult = await postLogin({
        username: inputs.username,
        password: inputs.password,
      });

      if (loginResult.token) {
        localStorage.setItem('token', loginResult.token);
        navigate('/');
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('Duplicate entry')) {
        setErrorMessage('Username or email already exists');
      } else {
        setErrorMessage('Registration failed: ' + errorMessage);
      }
      console.error(errorMessage);
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
<<<<<<< HEAD
    initValues,
  );

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="regusername">Username</label>
          <input
            name="username"
            type="text"
            id="regusername"
            onChange={handleInputChange}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="regpassword">Password</label>
          <input
            name="password"
            type="password"
            id="regpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
          />
        </div>
        <div>
          <label htmlFor="regemail">Email</label>
          <input
            name="email"
            type="email"
            id="regemail"
            onChange={handleInputChange}
            autoComplete="email"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );

=======
    initValues
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
      <label htmlFor="regUsername">Username</label>
      <input id="regUsername" name="username" onChange={handleInputChange} />

      <label htmlFor="regPassword">Password</label>
      <input
        id="regPassword"
        name="password"
        type="password"
        onChange={handleInputChange}
      />

      <label htmlFor="regEmail">Email</label>
      <input
        id="regEmail"
        name="email"
        type="email"
        onChange={handleInputChange}
      />

      <button type="submit">Register</button>
    </form>
  );
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
};

export default RegisterForm;
