import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { getArticle } from '../actions/articleAction';

class ArticleContainer extends Component {
  componentDidMount() {
    const { getArticle, match: { params: { postId } } } = this.props;
    getArticle(postId);
  }

  render() {
    const { article } = this.props;
    return (
      <main>
        <div style={{ textAlign: 'center', paddingBottome: '3rem' }}>
          <h1>{article.title}</h1>
          <small>
            Posted by user
            {article.userId}
          </small>
        </div>
        <p>{article.body}</p>
      </main>
    );
  }
}

ArticleContainer.propTypes = {
  getArticle: PropTypes.func.isRequired,
  article: PropTypes.shape({
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    body: PropTypes.string,
    userId: PropTypes.string,
    error: PropTypes.string,
  }),
};


const mapStateToProps = ({ article }) => ({
  article,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getArticle,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticleContainer));
