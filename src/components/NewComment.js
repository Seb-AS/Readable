import React, { Component } from "react";
import { connect } from "react-redux";
import { newComment } from "../actions/CommentsActions";
import { randomID } from "../Helper";

class NewComment extends Component {
  submit = e => {
    e.preventDefault();
    const postId = this.props.match.params.postId;
    const author = e.target.author.value;
    const comment = e.target.body.value;

    if ( author === "" || comment === "" ) {
      alert("please complete both fields");
    } else {
      const submitComment = {
        id: randomID(),
        timestamp: Date.now(),
        parentId: postId,
        body: comment,
        author: author
      };
      this.props.newComment(submitComment, postId, () =>
        this.props.history.push(`/post/${postId}`)
      );
    }
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <ul className="form-style-1">
          <li>
            <label>
              Name <span className="required">*</span>
            </label>
            <input type="text" name="author" className="field-long" />
          </li>
          <li>
            <label>
              Comment <span className="required">*</span>
            </label>
            <textarea
              name="body"
              id="field5"
              className="field-long field-textarea"
            />
          </li>
          <button>Submit</button>
        </ul>
      </form>
    );
  }
}

function mapStateToProps({ posts, categories }) {
  console.log("state", this.state);
  return {
    posts: posts
  };
}

export default connect(mapStateToProps, { newComment })(NewComment);
