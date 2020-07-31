import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

import * as headerActions from '../actions/headerAction';
import * as articleActions from '../actions/articleAction';

import DynamicViewWrapper from '../components/DynamicViewWrapper';

const styles = () => ({
  centeredHeader: {
    textAlign: 'center',
    paddingBottom: '2rem',
  },
});
class ArticleContainer extends Component {
  componentDidMount() {
    const {
      getArticle,
      toggleSearch,
      match: { params: { postId } },
    } = this.props;

    getArticle(postId);
    toggleSearch({ isSearchShown: false });
  }

  render() {
    const { article, classes } = this.props;
    return (
      <main>
        <DynamicViewWrapper
          isLoading={article.isLoading}
          loader={(<CircularProgress />)}
          error={article.error}
        >
          <div className={classes.centeredHeader}>
            <h1>{article.title}</h1>
            <small>
              Posted by user
              {article.userId}
            </small>
          </div>
          <p>{article.body}</p>
        </DynamicViewWrapper>
      </main>
    );
  }
}

ArticleContainer.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  getArticle: PropTypes.func.isRequired,
  toggleSearch: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object),
  article: PropTypes.shape({
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    userId: PropTypes.number,
    error: PropTypes.string,
  }),
};

ArticleContainer.defaultProps = {
  article: {
    isLoading: false,
    title: 'Test Article',
    body: 'Test Body',
    userId: 0,
    error: '',
  },
  match: {
    params: {
      postId: 1,
    },
  },
};

const mapStateToProps = ({ article }) => ({
  article,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getArticle: articleActions.getArticle,
  toggleSearch: headerActions.toggleSearch,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withStyles(styles)(ArticleContainer)));
