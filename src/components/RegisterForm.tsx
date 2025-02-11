import {useUser} from '../hooks/apiHooks';
import {useForm} from '../hooks/formHooks';
import {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = () => {
  const {postRegister} = useUser();
  const initValues: RegisterCredentials = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doRegister result', registerResult);
    } catch (error) {
      console.error((error as Error).message);
      // Display error to user here if desired.
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues
  );

  return (
    <div className="mx-auto max-w-md rounded-lg bg-gray-900 p-8 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="regusername"
            className="mb-1 font-medium text-gray-300"
          >
            Username
          </label>
          <input
            name="username"
            type="text"
            id="regusername"
            onChange={handleInputChange}
            autoComplete="username"
            className="rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-stone-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="regpassword"
            className="mb-1 font-medium text-gray-300"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            id="regpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            className="rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-stone-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="regemail" className="mb-1 font-medium text-gray-300">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="regemail"
            onChange={handleInputChange}
            autoComplete="email"
            className="rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-stone-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-stone-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-stone-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
