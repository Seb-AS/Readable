import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTime } from "../Helper";
import { Link } from "react-router-dom";
import * as commentActions from "../actions/CommentsActions";
import UpVote from "../images/upvote.png";
import DownVote from "../images/downvote.png";

class PostComment extends Component {
  deleteComment = comment => {
    let parentId = comment.parentId;
    this.props.deleteComment(comment.id, () => {
      this.props.history.push(`/post/${parentId}`);
      this.props.getPostComment(comment.parentId);
    });
  };

  render() {
    return (
      <div>
        {this.props.comments.map(comment => (
          <div className="comment" key={comment.id}>
            <div>
              <p>{comment.body}</p>
              <div className="comment-author">
                <p>
                  {" "}
                  by <b>{comment.author}</b> at {formatTime(comment.timestamp)}
                </p>
              </div>
              <div className="post-likes">
                <img
                  src={UpVote}
                  width="32"
                  height="32"
                  onClick={() => {
                    this.props.voteComment(
                      comment.id,
                      comment.parentId,
                      "upVote"
                    );
                  }}
                />
                <img
                  src={DownVote}
                  width="32"
                  height="32"
                  onClick={() => {
                    this.props.voteComment(
                      comment.id,
                      comment.parentId,
                      "downVote"
                    );
                  }}
                />
                {comment.voteScore} votes
              </div>
            </div>
            <div className="button-action">
              <Link
                to={`/${this.props.category}/${comment.parentId}/${
                  comment.id
                }/edit`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => this.deleteComment(comment)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps, commentActions)(PostComment);
