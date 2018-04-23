import * as RestAPI from "../api/RestAPI";
import * as Types from "./Types.js";

export const getPostComment = parentId => {
  return dispatch => {
    RestAPI.getComment(parentId).then(comments => {
      dispatch({ type: Types.GET_COMMENTS, parentId, comments });
    });
  };
};

export const newComment = (comment, parentId, callback) => {
  return dispatch => {
    RestAPI.addComment(comment)
      .then(comment => {
        dispatch({ type: Types.ADD_COMMENT, parentId, comment });
      })
      .then(() => callback());
  };
};

export const deleteComment = (commentId, callback) => {
  return dispatch => {
    RestAPI.deleteComment(commentId).then(() => callback());
    dispatch({ type: Types.DELETE_COMMENT, commentId });
  };
};

export const updateComment = (
  commentId,
  parentId,
  timestamp,
  body,
  callback
) => {
  return dispatch => {
    RestAPI.updateComment(commentId, timestamp, body)
      .then(updatedComment => {
        dispatch({
          type: Types.UPDATE_COMMENT,
          updatedComment,
          commentId,
          parentId
        });
      })
      .then(() => callback());
  };
};

export const voteComment = (commentId, parentId, option) => {
  return dispatch => {
    RestAPI.voteComment(commentId, option).then(updatedComment => {
      dispatch({
        type: Types.VOTE_COMMENT,
        updatedComment,
        commentId,
        parentId
      });
    });
  };
};
