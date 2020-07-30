import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import PostsContainer from './containers/PostsContainer';
import ArticleContainer from './containers/ArticleContainer';

class App extends Component {
  render() {
    const { header, posts } = this.props;
    return (
      <Router>
        <Container className="App" style={{ maxWidth: '720px' }}>
          <Header title={header.title} itemsList={posts.items} />
          <Switch>
            <Route path="/post/:postId">
              <ArticleContainer />
            </Route>
            <Route path="/:pageNumber">
              <PostsContainer />
            </Route>
            <Route path="/">
              <PostsContainer />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

App.propTypes = {
  header: PropTypes.shape({
    title: PropTypes.string,
  }),
  posts: PropTypes.shape({
    items: PropTypes.instanceOf(Array),
  }),
};

App.defaultProps = {
  header: {
    title: 'Blog',
  },
  posts: {
    items: [],
  },
};

const mapStateToProps = ({ header, posts }) => ({
  header,
  posts,
});

export default connect(mapStateToProps)(App);
