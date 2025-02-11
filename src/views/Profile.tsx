import {useUserContext} from '../hooks/ContextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <div className="mx-auto mt-8 max-w-md rounded-lg bg-gray-900 p-6 text-white shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Profile</h2>
      {user ? (
        <div className="space-y-2">
          <p className="text-lg">
            <span className="font-semibold">Username:</span> {user.username}{' '}
            <span className="text-sm text-gray-400">({user.email})</span>
          </p>
          <p>
            <span className="font-semibold">User Level:</span> {user.level_name}
          </p>
          <p>
            <span className="font-semibold">Registered:</span>{' '}
            {new Date(user.created_at).toLocaleString('fi-FI')}
          </p>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Profile;
