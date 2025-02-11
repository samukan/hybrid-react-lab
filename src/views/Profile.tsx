import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      <h2>Profile</h2>
<<<<<<< HEAD
      {user && (
        <>
          <p>
            {user.username} ({user.email})
          </p>
          <p>User level: {user.level_name}</p>
          <p>Registered: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </>
      )}
=======
      <p>{user?.username}</p>
      <p>{user?.email}</p>
      <p>{user?.level_name}</p>
      <p>
        {user?.created_at && new Date(user.created_at).toLocaleString('fi-FI')}
      </p>
>>>>>>> ab877c77d0810a04ef12d200cd7426ef61e49486
    </>
  );
};

export default Profile;
