import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTime } from "../Helper";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getPostComment } from "../actions/CommentsActions";
import { getAllPosts, votePost, deletePost } from "../actions/PostsActions";
import PostComment from "./PostComment";
import UpVote from "../images/upvote.png";
import DownVote from "../images/downvote.png";

class PostDetails extends Component {
  componentDidMount() {
    this.props.getAllPosts();
    this.props.getPostComment(this.props.match.params.postId);
  }

  onPostDelete = () => {
    const id = this.props.match.params.postId;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  };

  render() {
    const {getAllPosts, comments, post, votePost } = this.props;
    if (!post) {
      return <div><p>404 ERROR</p></div>;
    }
    return (
      <div>
        {post && (
          <div className="post" key={post.id}>
            <div className="post-description">
              <Link to={`/${post.category}/${post.id}`}>
                <div className="post-title">
                  <h3>{post.title}</h3>
                </div>
              </Link>
              <div className="post-body">
                <p>{post.body}</p>
              </div>
              <div className="post-likes">
                <img
                  src={UpVote}
                  width="32"
                  height="32"
                  onClick={() => {
                    votePost(post.id, "upVote");
                    getAllPosts();
                  }}
                />
                <img
                  src={DownVote}
                  width="32"
                  height="32"
                  onClick={() => {
                    votePost(post.id, "downVote");
                    getAllPosts();
                  }}
                />
              </div>
              <div className="post-likes-comments">
                {post.voteScore} votes{" "}
                {comments && comments ? comments.length : 0} comments
              </div>
            </div>
            <div>
              <div className="post-author">
                <p>
                  <b>Category: </b> {post.category}
                </p>
              </div>
              <div className="post-author">
                <p>
                  <b>Author: </b> {post.author}
                </p>
              </div>
              <div className="post-author">
                <p>
                  <b>Time: </b> {formatTime(post.timestamp)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="button-action">
          <Link to={`/${post.category}/${post.id}/edit`}>
            <button>Edit</button>
          </Link>
          <Link to={`/${post.category}/${post.id}/comment`}>
            <button>Add Comment</button>
          </Link>
          <button onClick={e => this.onPostDelete(e)}>Delete</button>
        </div>
        {post &&
          comments && (
            <PostComment
              category={post.category}
              comments={comments}
              history={this.props.history}
            />
          )}
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  const post = _.find(posts, { id: match.params.postId });
  return {
    post: post,
    comments: comments[match.params.postId]
  };
}

export default connect(mapStateToProps, {
  getAllPosts,
  getPostComment,
  deletePost,
  votePost
})(PostDetails);
