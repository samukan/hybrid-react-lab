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

  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

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
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
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
};

export default RegisterForm;
