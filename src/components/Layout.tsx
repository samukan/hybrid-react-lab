import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';

const Layout = () => {
  const {user, handleLogout} = useUserContext();

  return (
    <>
      <h1>My App</h1>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/upload">Upload</Link>
                </li>
              </>
            )}
            <li>
              {!user ? (
                <Link to="/login">Login</Link>
              ) : (
                <button onClick={handleLogout}>Logout</button>
              )}
            </li>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </>
  );
};

export default Layout;
