// src/components/MediaRow.tsx

import {MediaItem} from 'hybrid-types/DBTypes';

const MediaRow = (props: {
  item: MediaItem;
  setSelectedItem: (item: MediaItem) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
    <tr>
      <td>
        <img src={item.thumbnail || undefined} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>
        <button onClick={() => setSelectedItem(item)}>View</button>
      </td>
    </tr>
  );
};

export default MediaRow;
