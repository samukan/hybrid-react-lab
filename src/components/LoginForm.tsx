import {useForm} from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/ContextHooks';

<<<<<<< HEAD
const LoginForm = (props: {
  toggleRegister: () => void;
}) => {
=======
const LoginForm = (props: {toggleRegister: () => void}) => {
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
  const {toggleRegister} = props;
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs as Credentials);
    } catch (error) {
      console.error((error as Error).message);
      // Display error to user here(?)
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
<<<<<<< HEAD
    initValues,
=======
    initValues
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
  );

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginusername">Username</label>
          <input
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            // value={inputs.username}
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            // value={inputs.password}
          />
        </div>
        <button type="submit">Login</button>
        <button onClick={toggleRegister}>or register?</button>
      </form>
    </>
  );
};

export default LoginForm;
