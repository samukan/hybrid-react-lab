import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import MediaRow from '../components/MediaRow';
import {useState} from 'react';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<
    MediaItemWithOwner | undefined
  >(undefined);
  const {mediaArray} = useMedia();

  console.log(mediaArray);

  return (
    <div className="mx-auto max-w-7xl p-4">
      {/* Modal for Single View */}
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <h2 className="mb-4 text-2xl font-bold text-white">My Media</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="border-b border-gray-700 px-4 py-2">Thumbnail</th>
              <th className="border-b border-gray-700 px-4 py-2">Title</th>
              <th className="border-b border-gray-700 px-4 py-2">
                Description
              </th>
              <th className="border-b border-gray-700 px-4 py-2">Created</th>
              <th className="border-b border-gray-700 px-4 py-2">Size</th>
              <th className="border-b border-gray-700 px-4 py-2">Type</th>
              <th className="border-b border-gray-700 px-4 py-2">Owner</th>
            </tr>
          </thead>
          <tbody>
            {mediaArray.map((item) => (
              <MediaRow
                item={item}
                key={item.media_id}
                setSelectedItem={setSelectedItem}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
