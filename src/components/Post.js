import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTime } from "../Helper";
import { Link } from "react-router-dom";
import { getAllPosts, votePost } from "../actions/PostsActions";
import { getPostComment } from "../actions/CommentsActions";
import UpVote from "../images/upvote.png";
import DownVote from "../images/downvote.png";

class Post extends Component {
  componentDidMount() {
    this.props.getPostComment(this.props.post.id);
  }

  render() {
    const { post, comments, votePost, getAllPosts } = this.props;

    return (
      <div>
        {post && (
          <div className="post">
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
      </div>
    );
  }
}

function mapStateToProps({ comments }, { post }) {
  return {
    comments: comments[post.id]
  };
}
export default connect(mapStateToProps, {
  getAllPosts,
  votePost,
  getPostComment
})(Post);
