import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toggleSearch } from '../actions/headerAction';

import { getArticle } from '../actions/articleAction';

import DynamicViewWrapper from '../components/DynamicViewWrapper';

class ArticleContainer extends Component {
  componentDidMount() {
    const { getArticle: getTheArticle, match: { params: { postId } }, toggleSearch } = this.props;
    getTheArticle(postId);
    toggleSearch({ isSearchShown: false });
  }

  render() {
    const { article } = this.props;
    return (
      <main>
        <DynamicViewWrapper
          isLoading={article.isLoading}
          loader={(<CircularProgress />)}
          error={article.error}
        >
          <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
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
  getArticle: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object),
  article: PropTypes.shape({
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    userId: PropTypes.string,
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
  getArticle,
  toggleSearch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleContainer));
