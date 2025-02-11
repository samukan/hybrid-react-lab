import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Link} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {item, setSelectedItem} = props;
  const {user} = useUserContext();

  const showEditDelete =
    user && (user.level_name === 'Admin' || user.username === item.username);

  return (
    <tr className="bg-gray-800 transition-colors duration-200 hover:bg-gray-700">
      <td className="border-b border-gray-700 p-4">
        <img
          className="h-48 w-64 rounded object-cover"
          src={
            item.thumbnail ||
            (item.screenshots && item.screenshots[2]) ||
            undefined
          }
          alt={item.title}
        />
      </td>
      <td className="border-b border-gray-700 p-4">{item.title}</td>
      <td className="border-b border-gray-700 p-4">{item.description}</td>
      <td className="border-b border-gray-700 p-4">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>
      <td className="border-b border-gray-700 p-4">{item.filesize}</td>
      <td className="border-b border-gray-700 p-4">{item.media_type}</td>
      <td className="border-b border-gray-700 p-4">{item.username}</td>
      <td className="border-b border-gray-700 p-4">
        <Link
          to="/single"
          state={{item}}
          className="rounded bg-stone-600 px-3 py-1 text-white transition-colors duration-200 hover:bg-stone-700"
        >
          Show
        </Link>
      </td>
      {showEditDelete && (
        <td className="border-b border-gray-700 p-4">
          <button
            className="mr-2 rounded bg-stone-600 px-3 py-1 text-white transition-colors duration-200 hover:bg-stone-700"
            onClick={() => console.log('modify', item)}
          >
            Modify
          </button>
          <button
            className="rounded bg-stone-600 px-3 py-1 text-white transition-colors duration-200 hover:bg-stone-700"
            onClick={() => console.log('delete', item)}
          >
            Delete
          </button>
        </td>
      )}
    </tr>
  );
};

export default MediaRow;
