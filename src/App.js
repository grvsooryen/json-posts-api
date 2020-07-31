import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import PostsContainer from './containers/PostsContainer';
import ArticleContainer from './containers/ArticleContainer';

const styles = () => ({
  maxContainerWidth: {
    maxWidth: '720px',
  },
});
class App extends Component {
  render() {
    const { header, posts, classes } = this.props;
    return (
      <Router>
        <Container className={classes.maxContainerWidth}>
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
  classes: PropTypes.instanceOf(Object).isRequired,
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

export default connect(mapStateToProps)(withStyles(styles)(App));
