import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { getPosts, updatePost, updatePageNumber } from '../actions/postsAction';
import { showDialog, hideDialog, editDialog } from '../actions/editFormAction';

import PostItems from '../components/PostItems';
import FormDialog from '../components/FormDialog';

class PostsContainer extends Component {
  componentDidMount() {
    const {
      getPosts: getThePosts,
      updatePageNumber,
      match: { params: { pageNumber } }
    } = this.props;
    updatePageNumber(pageNumber);
    getThePosts();
  }

  componentDidUpdate(prevProps) {
    console.log('prev', prevProps.match.params.pageNumber);
    console.log('current', this.props.match.params.pageNumber);
    const { match: { params: { pageNumber: prevPageNumber } } } = prevProps;
    const { match: { params: { pageNumber } }, updatePageNumber } = this.props;
    if (pageNumber !== prevPageNumber) {
      updatePageNumber(pageNumber);
    }
  }

  filterPosts = (pageNumber, postsPerPage = 10) => {
    const { posts: { items = [] } } = this.props;
    const start = (pageNumber - 1) * postsPerPage;
    const end = start + postsPerPage;
    return items.slice(start, end);
  }

  render() {
    const {
      editDialog,
      hideDialog,
      updatePost,
      editForm,
      posts,
    } = this.props;
    const { pageNumber = 1 } = posts;
    return (
      <main>
        <PostItems
          items={this.filterPosts(pageNumber)}
          editDialog={(e) => editDialog(e)}
        />
        <FormDialog
          editForm={editForm}
          hideDialog={(e) => hideDialog(e)}
          updatePost={(e) => updatePost(e)}
        />
        <Grid container justify="center">
          <Pagination
            style={{
              display: 'block',
              margin: '3rem auto',

            }}
            page={Number(pageNumber)}
            count={10}
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/${item.page === 1 ? '' : `${item.page}`}`}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...item}
              />
            )}
          />
        </Grid>
      </main>
    );
  }
}

PostsContainer.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.shape({
    isLoading: PropTypes.bool,
    items: PropTypes.instanceOf(Array),
    error: PropTypes.string,
  }),
};

PostsContainer.defaultProps = {
  posts: [],
};

const mapStateToProps = ({ posts, editForm }) => ({
  posts,
  editForm,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPosts,
  updatePost,
  showDialog,
  hideDialog,
  editDialog,
  updatePageNumber,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostsContainer));
