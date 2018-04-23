import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from '../components/Post'
import { connect } from 'react-redux'
import * as actions from '../actions/PostsActions';

class MainPage extends Component {
  static propTypes = {
    posts: PropTypes.array
  }

  componentDidMount() {
    this.props.getAllPosts()
  }

  render() {
    const { posts } = this.props
    return <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  }
}

function mapStateToProps({ posts }, { match }) {
  const category = match.params.category
  return {
    posts: category ? posts.filter(post => post.category === category) : posts
  }
}

export default connect(mapStateToProps, actions)(MainPage)
