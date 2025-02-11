import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Link} from 'react-router';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {item} = props;
  return (
    <tr className="bg-gray-800 transition-colors duration-200 hover:bg-gray-700">
      <td className="border-b border-gray-700 p-4">
        <img
          className="rounded object-cover"
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
    </tr>
  );
};

export default MediaRow;
