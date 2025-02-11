import {MediaItemWithOwner} from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  console.log(item);
  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      {item && (
        <div className="relative w-full max-w-3xl rounded-lg bg-gray-900 p-6 text-white shadow-lg">
          {/* Close button */}
          <button
            onClick={() => setSelectedItem(undefined)}
            className="absolute top-4 right-4 text-white transition-colors duration-200 hover:text-red-400"
          >
            Close
          </button>
          {/* Title */}
          <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
          {/* Date */}
          <p className="mb-4 text-sm text-gray-400">
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </p>
          {/* Media Display */}
          {item.media_type.includes('image') ? (
            <img
              src={item.filename}
              alt={item.title}
              className="mb-4 h-auto w-full rounded object-contain"
            />
          ) : (
            <video
              src={item.filename}
              controls
              className="mb-4 h-auto w-full rounded object-contain"
            />
          )}
          {/* Description */}
          <p>{item.description}</p>
        </div>
      )}
    </dialog>
  );
};

export default SingleView;
