import {useUserContext} from '../hooks/ContextHooks';
import {useCommentStore} from '../store';
import {useRef, useEffect} from 'react';
import {useForm} from '../hooks/formHooks';
import {useComment} from '../hooks/apiHooks';

const Comments = ({media_id}: {media_id: number}) => {
  const user = useUserContext();
  const {comments, setComments} = useCommentStore();
  const formRef = useRef<HTMLFormElement>(null);
  const initialValues = {comment_text: ''};
  const commentApi = useComment();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      commentApi.getComments(media_id).then((fetchedComments) => {
        setComments(fetchedComments);
      });
    }
  }, [media_id]);

  const doSubmit = async () => {
    if (user && inputs.comment_text) {
      const token = localStorage.getItem('token');
      if (token) {
        await commentApi.postComment(
          inputs.comment_text,
          media_id,
          user.user_id,
          token,
        );
        const updatedComments = await commentApi.getComments(media_id);
        setComments(updatedComments);
        formRef.current?.reset();
      }
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doSubmit,
    initialValues,
  );

  return (
    <>
      {user && (
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            name="comment_text"
            type="text"
            placeholder="Add a comment..."
            onChange={handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <ul>
        {comments
          .filter((comment) => comment.media_id === media_id)
          .map((comment) => (
            <li key={comment.comment_id}>
              {comment.comment_text} - {comment.username}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Comments;
