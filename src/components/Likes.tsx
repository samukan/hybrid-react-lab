import {Like, MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useReducer} from 'react';
import {useLike} from '../hooks/apiHooks';

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

const likeReducer = (state: LikeState, action: LikeAction): LikeState => {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      return {...state, userLike: action.like ?? null};
    default:
      return state;
  }
};

const Likes = ({item}: {item: MediaItemWithOwner}) => {
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  //const {postLike, deleteLike, getCountByMediaId, getUserLike} = useLike();

  return (
    <>
      <p>Likes: {likeState.count}</p>
      <button onClick={() => {likeDispatch({type: 'like', like: null})}}>Unlike</button>
    </>
  );
};

export default Likes;
