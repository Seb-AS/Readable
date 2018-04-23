import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { sort } from "./actions/PostsActions";
import { getCategories } from "./actions/CategoriesActions";
import NewPost from "./components/NewPost";
import NewComment from "./components/NewComment";
import EditComment from "./components/EditComment";
import EditPost from "./components/EditPost";
import MainPage from "./components/MainPage";
import PostDetails from "./components/PostDetails";
import NewImage from "./images/new.png";

class App extends Component {
  static propTypes = {
    posts: PropTypes.array,
    categories: PropTypes.array
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const { categories, sort } = this.props;

    return (
      <div className="App">
        <div className="nav-header">
          <Link className="home" to="/">
            <p>ReaDAble</p>
          </Link>
          <Link className="new-post" to="/new">
            <img src={NewImage} width="50" height="50" />
          </Link>
        </div>
        <div className="filters">
          <div className="category-changer">
            <p><u>Choose Category:</u></p>
            {categories &&
              categories.map(category => (
                <Link key={category.name} to={`/${category.path}`}>
                  <ul><button>{category.name}</button></ul>
                </Link>
              ))}
          </div>
          <div className="sort-changer">
            <p><u>Sort:</u></p>
              <ul><button onClick={() => sort("timestamp")}>by Time</button></ul>
              <ul><button onClick={() => sort("voteScore")}>by Score</button></ul>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/new" component={NewPost} />
          <Route exact path="/:category" component={MainPage} />
          <Route exact path="/:category/:postId" component={PostDetails} />
          <Route path="/:category/:postId/edit" component={EditPost} />
          <Route path="/:category/:postId/comment" component={NewComment} />
          <Route
            path="/:category/:postId/:commentId/edit"
            component={EditComment}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ categories }) {
  return { categories: categories };
}

export default withRouter(
  connect(mapStateToProps, { sort, getCategories })(App)
);
