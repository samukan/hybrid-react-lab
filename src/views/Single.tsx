import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useLocation, useNavigate, NavigateFunction} from 'react-router';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;

  return (
    <div className="mx-auto my-8 max-w-3xl rounded-lg bg-gray-900 p-6 text-white shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Single</h2>
      <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
      <p className="mb-4 text-sm text-gray-400">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </p>
      <div className="mb-4">
        {item.media_type.includes('image') ? (
          <img
            src={item.filename}
            alt={item.title}
            className="h-auto w-full rounded object-contain"
          />
        ) : (
          <video
            src={item.filename}
            controls
            className="h-auto w-full rounded object-contain"
          />
        )}
      </div>
      <p className="mb-2">{item.description}</p>
      <p className="mb-2">
        <span className="font-semibold">Owner:</span> {item.username}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Type:</span> {item.media_type}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Size:</span>{' '}
        {Math.round(item.filesize / 1024)} kB
      </p>
      <button
        onClick={() => navigate(-1)}
        className="rounded bg-stone-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-stone-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default Single;
