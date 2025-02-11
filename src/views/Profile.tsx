import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

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
