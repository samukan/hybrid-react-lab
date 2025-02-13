import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';
import {useForm} from '../hooks/formHooks';
import {useCommentStore} from '../store';
import {useRef} from 'react';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const user = useUserContext();
  const {comments, addComment} = useCommentStore();

  const initValues = {comment_text: ''};
  const doComment = () => {
    addComment({
      comment_text: inputs.comment_text,
      username: user.user?.username,
      user_id: user.user?.user_id,
      media_id: item.media_id,
    });
    // reset form
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
              // value={inputs.username}
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
      {comments.length > 0 && (
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              {comment.username} (
              {new Date(comment.created_at || '').toLocaleString('fi-FI')}):
              {comment.comment_text}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comments;
