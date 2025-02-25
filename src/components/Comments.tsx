import {useEffect, useRef} from 'react';
import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {useForm} from '../hooks/formHooks';
import {useCommentStore} from '../store';
import {useComment} from '../hooks/apiHooks';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const user = useUserContext();
  const {comments, setComments} = useCommentStore();
  const {postComment, getComments} = useComment();

  const initValues = {comment_text: ''};

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(item.media_id);
      setComments(fetchedComments);
    };

    fetchComments();

    const intervalId = setInterval(fetchComments, 5000);

    return () => clearInterval(intervalId);
  }, [item.media_id, getComments, setComments]);

  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!token || !user.user) return;
    await postComment(
      inputs.comment_text,
      item.media_id,
      user.user.user_id,
      token,
    );
    const updatedComments = await getComments(item.media_id);
    setComments(updatedComments);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setInputs(initValues);
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doComment,
    initValues,
  );

  return (
    <>
      {user && (
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="flex w-4/5 flex-col">
            <label htmlFor="comment_text">Post a comment</label>
            <input
              className="my-2.5 rounded-md border p-2.5"
              name="comment_text"
              type="text"
              id="comment_text"
              onChange={handleInputChange}
              autoComplete="off"
              ref={inputRef}
            />
          </div>
          <button
            disabled={!inputs.comment_text}
            className="my-2.5 block w-4/5 rounded-md bg-stone-500 p-2 text-center transition-all duration-500 ease-in-out hover:bg-stone-700"
            type="submit"
          >
            Post
          </button>
        </form>
      )}
      <div className="mt-4 w-full">
        <h3 className="mb-2 text-lg font-semibold">Comments</h3>
        <ul className="space-y-2">
          {comments?.map((comment) => (
            <li key={comment.comment_id} className="rounded border p-2">
              <span className="font-bold">{comment.username}</span>{' '}
              <span className="text-sm text-gray-500">
                ({new Date(comment.created_at || '').toLocaleString('fi-FI')})
              </span>
              : {comment.comment_text}
            </li>
          ))}
          {comments.length === 0 && (
            <li className="text-gray-500">No comments yet</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Comments;
