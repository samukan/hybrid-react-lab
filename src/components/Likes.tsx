import {Like, MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useEffect, useReducer} from 'react';
import {useLike} from '../hooks/apiHooks';

// State types and reducer
type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  like?: Like | null;
  count?: number;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

function likeReducer(state: LikeState, action: LikeAction): LikeState {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      return {
        ...state,
        userLike: action.like !== undefined ? action.like : state.userLike,
      };
    default:
      return state;
  }
}

const Likes = ({item}: {item: MediaItemWithOwner | null}) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  const {postLike, deleteLike, getCountByMediaId, getUserLike} = useLike();

  // Get the user's like for the media
  const getLikes = async () => {
    const token = localStorage.getItem('token');
    if (!item || !token) return;
    try {
      const userLike = await getUserLike(item.media_id, token);
      likeDispatch({type: 'like', like: userLike as unknown as Like});
    } catch (e) {
      likeDispatch({type: 'like', like: null});
      console.error('get user like error', (e as Error).message);
    }
  };

  // Get the like count for the media
  const getLikeCount = async () => {
    if (!item) return;
    try {
      const countResponse = await getCountByMediaId(item.media_id);
      likeDispatch({type: 'setLikeCount', count: countResponse.count});
    } catch (e) {
      console.error('get like count error', (e as Error).message);
    }
  };

  // Handle like button click
  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!item || !token) return;
    try {
      if (likeState.userLike) {
        // Delete the like if the user already liked the media
        await deleteLike(likeState.userLike.like_id, token);
      } else {
        // Post a new like if the user hasn't liked the media yet
        await postLike(item.media_id, token);
      }
      // Refresh state
      getLikes();
      getLikeCount();
    } catch (e) {
      console.error('like error', (e as Error).message);
    }
  };

  useEffect(() => {
    getLikes();
    getLikeCount();
  }, [item]);

  return (
    <div>
      <p>Likes: {likeState.count}</p>
      {localStorage.getItem('token') && (
        <button className="show-button" onClick={handleLike}>
          {likeState.userLike ? 'Unlike' : 'Like'}
        </button>
      )}
    </div>
  );
};

export default Likes;
