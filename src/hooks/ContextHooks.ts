// ContextHooks.ts
import {useContext} from 'react';
<<<<<<< HEAD
import {UserContext} from '../contexts/UserContext';
=======
import {UserContext} from '../contexts/userContext';
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486

// Current recommendation is to use custom hook instead of the context directly
// this way we don't have errors when UserContext is not defined or null (thats why we have the if statement)

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within an UserProvider');
  }

  return context;
};

export {useUserContext};
