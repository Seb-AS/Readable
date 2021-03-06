import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getAllPosts, updatePost } from "../actions/PostsActions";
import { getPostComment } from "../actions/CommentsActions";

class EditPost extends Component {
  componentDidMount() {
    this.props.getAllPosts();
    this.props.getPostComment(this.props.match.params.postId);
  }

  editPost = e => {
    e.preventDefault();
    const postId = this.props.post.id;
    const title = e.target.title.value;
    const body = e.target.body.value;

    if (body === "" || title === "") {
      alert("Please complete both fields");
    } else {
      this.props.updatePost(postId, title, body, () =>
        this.props.history.push("/")
      );
    }
  };

  render() {
    const { post } = this.props;

    return (
      <div>
        <form onSubmit={this.editPost}>
          <h2>Edit Post</h2>
          <ul className="form-style-2">
            <li>
              <label>
                Title <span className="required">*</span>
              </label>
              <input
                defaultValue={post.title}
                type="text"
                name="title"
                className="field-long"
              />
            </li>
            <li>
              <label>
                Post <span className="required">*</span>
              </label>
              <textarea
                defaultValue={post.body}
                name="body"
                id="field5"
                className="field-long field-textarea"
              />
            </li>
            <button>Update</button>
            <Link to={`/post/${post.id}`}>
              <button>Cancel</button>
            </Link>
          </ul>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, { match }) {
  return {
    post: _.find(posts, { id: match.params.postId }),
    comments: comments[match.params.postId]
  };
}

export default connect(mapStateToProps, {
  getAllPosts,
  updatePost,
  getPostComment
})(EditPost);
