import * as RestAPI from "../api/RestAPI";
import * as Types from "./Types.js";

export const getAllPosts = () => {
  return dispatch => {
    RestAPI.getPosts().then(posts => {
      dispatch({ type: Types.GET_POSTS, posts });
    });
  };
};

export const getCategoryPosts = category => {
  return dispatch => {
    RestAPI.getCategoryPosts(category).then(posts => {
      dispatch({ type: Types.GET_CATEGORY_POSTS, posts });
    });
  };
};

export const createPost = (post, callback) => {
  return dispatch => {
    RestAPI.addPost(post).then(() => callback());
    dispatch({ type: Types.ADD_POST, post });
  };
};

export const updatePost = (postId, title, body, callback) => {
  return dispatch => {
    RestAPI.updatePost(postId, title, body)
      .then(updatedPost => {
        dispatch({ type: Types.UPDATE_POST, updatedPost, postId });
      })
      .then(() => callback());
  };
};

export const deletePost = (postId, callback) => {
  return dispatch => {
    RestAPI.deletePost(postId).then(() => callback());
    dispatch({ type: Types.DELETE_POST, postId });
  };
};

export const votePost = (postId, option) => {
  return dispatch => {
    RestAPI.votePost(postId, option).then(post => {
      dispatch({ type: Types.VOTE_POST, postId, option });
    });
  };
};

export const sort = sortKey => {
  return dispatch => {
    dispatch({ type: Types.SORT_POST, sortKey });
  };
};
