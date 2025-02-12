import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import MediaRow from '../components/MediaRow';
import {useState} from 'react';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';
import TryReducerCounter from '../components/TryReducerCounter';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);

  const {mediaArray} = useMedia();

  console.log(mediaArray);

  return (
    <>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <h2>My Media</h2>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mediaArray.map((item) => (
          <MediaRow
            item={item}
            key={item.media_id}
            setSelectedItem={setSelectedItem}
          />
        ))}
      </section>
    </>
  );
};
export default Home;
