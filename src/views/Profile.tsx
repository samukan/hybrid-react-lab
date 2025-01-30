import {useUser} from '../hooks/apiHooks';
import {useEffect, useState, useCallback} from 'react';
import {UserWithNoPassword} from 'hybrid-types/DBTypes';

const Profile = () => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {getUserByToken} = useUser();

  const getUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const userResponse = await getUserByToken(token);
    setUser(userResponse.user);
  }, [getUserByToken]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <h2>Profile</h2>
      <p>{user?.username}</p>
      <p>{user?.email}</p>
      <p>{user?.level_name}</p>
      <p>
        {user?.created_at && new Date(user.created_at).toLocaleString('fi-FI')}
      </p>
    </>
  );
};

export default Profile;
