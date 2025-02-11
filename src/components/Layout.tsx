import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import {useEffect} from 'react';

const Layout = () => {
  // jos käyttäjää ei ole, kutsu handleAutoLogin()
  const {user, handleAutoLogin} = useUserContext();
  useEffect(() => {
    if (!user) {
      handleAutoLogin();
    }
  }, []);

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-[#141627] p-8 text-white">
      <header>
        <h1 className="mb-6 text-3xl font-bold">My App</h1>
      </header>

      <nav>
        <ul className="flex list-none justify-end bg-gray-600">
          <li>
            <Link
              className="block px-4 py-3 text-center transition-colors duration-200 hover:bg-gray-700"
              to="/"
            >
              Home
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  className="block px-4 py-3 text-center transition-colors duration-200 hover:bg-gray-700"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="block px-4 py-3 text-center transition-colors duration-200 hover:bg-gray-700"
                  to="/upload"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link
                  className="block px-4 py-3 text-center transition-colors duration-200 hover:bg-gray-700"
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link
                className="block px-4 py-3 text-center transition-colors duration-200 hover:bg-gray-700"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <main className="mt-8">
        <Outlet />
      </main>

      <footer className="mt-12 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
