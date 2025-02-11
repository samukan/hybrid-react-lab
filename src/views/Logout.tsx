<<<<<<< HEAD
import {useEffect} from 'react';
import {useUserContext} from '../hooks/ContextHooks';

const Logout = () => {
  const {handleLogout} = useUserContext();
  // kutsu handleLogout useEffectin sisällä
  useEffect(() => {
    handleLogout();
  }, []);
=======
const Logout = () => {
  // call handleLogout function inside useEffect
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
  return <div>Logout</div>;
};

export default Logout;
