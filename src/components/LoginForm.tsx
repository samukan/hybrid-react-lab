import {useForm} from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/ContextHooks';

const LoginForm = (props: {toggleRegister: () => void}) => {
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
      // Optionally, display error to the user here.
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues
  );

  return (
    <div className="mx-auto max-w-md rounded-lg bg-gray-900 p-8 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="loginusername"
            className="mb-1 font-medium text-gray-300"
          >
            Username
          </label>
          <input
            name="username"
            type="text"
            id="loginusername"
            onChange={handleInputChange}
            autoComplete="username"
            // value={inputs.username}
            className="rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-stone-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="loginpassword"
            className="mb-1 font-medium text-gray-300"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            // value={inputs.password}
            className="rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-stone-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            className="w-full rounded bg-stone-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-stone-700"
          >
            Login
          </button>
          <button
            type="button"
            onClick={toggleRegister}
            className="w-full rounded bg-gray-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-700"
          >
            or register?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
