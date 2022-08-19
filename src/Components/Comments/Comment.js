import axios from "axios";
import { useEffect, useState } from "react";
import "./Comment.scss";

/**
 *
 * @param {{name: string, content: string}} param0
 * @returns
 */
function Comment({ name, content }) {
  return (
    <>
      <div className="commentWrapper">
        <div className="commentNameWrapper">{name}</div>
        <div className="commentContentWrapper">{content}</div>
      </div>
    </>
  );
}

/**
 *
 * @param {{onHandle: (string)=>void, onSubmit: (string)=>void}} param0
 */
function CommentInput({ onHandle, onSubmit }) {
  const [comment, setComment] = useState("");

  const commentHandle = (e) => {
    setComment(e.target.value);
    onHandle(e.target.value);
  };

  return (
    <>
      <div className="CommentInputWrapper">
        <input
          type={"text"}
          placeholder="댓글을 작성해주세요"
          onChange={commentHandle}
          value={comment}
        />
        <div className="CommentSubmit" onClick={onSubmit}>
          보내기
        </div>
      </div>
    </>
  );
}

/**
 *
 * @param {{contentId: string}} param0
 */
function Comments({ contentId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    const commentsResponse = await axios.get(`/comments/${contentId}`, {
      headers: {
        Authorization: localStorage.getItem("login-token"),
      },
    });

    setComments(commentsResponse.data);
  };

  const commentInputHandle = (str) => setComment(str);

  const submitComment = async () => {
    const submitResponse = await axios.post(
      `/comments/${contentId}`,
      {
        content: comment,
      },
      {
        headers: {
          Authorization: localStorage.getItem("login-token"),
        },
      }
    );

    await fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <div className="CommentComponentWrapper">
        <div className="CommentsWrapper">
          {comments.map((comment) => (
            <Comment name={comment.name} content={comment.content} />
          ))}
        </div>
        <CommentInput onHandle={commentInputHandle} onSubmit={submitComment} />
      </div>
    </>
  );
}
