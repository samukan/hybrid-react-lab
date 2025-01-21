// src/components/SingleView.tsx

import {MediaItem} from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItem;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;

  return (
    <dialog open>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      {item.media_type.includes('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video controls src={item.filename} />
      )}
      <br />
      <button onClick={() => setSelectedItem(undefined)}>Close</button>
    </dialog>
  );
};

export default SingleView;
