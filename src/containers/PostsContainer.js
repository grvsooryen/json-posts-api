import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { getPosts, updatePost, updatePageNumber } from '../actions/postsAction';
import { showDialog, hideDialog, editDialog } from '../actions/editFormAction';
import { toggleSearch } from '../actions/headerAction';

import PostItems from '../components/PostItems';
import FormDialog from '../components/FormDialog';
import DynamicViewWrapper from '../components/DynamicViewWrapper';

class PostsContainer extends Component {
  componentDidMount() {
    const {
      getPosts: getThePosts,
      updatePageNumber: updateNewPageNumber,
      match: { params: { pageNumber } },
    } = this.props;
    updateNewPageNumber(Number(pageNumber) || 1);
    getThePosts();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { pageNumber: prevPageNumber } } } = prevProps;
    const {
      match: {
        params: { pageNumber },
      },
      updatePageNumber: updateCurrentPageNumber,
      isSearchShown,
      toggleSearch,
    } = this.props;
    if (pageNumber !== prevPageNumber) {
      updateCurrentPageNumber(pageNumber);
    }

    if (!isSearchShown) {
      toggleSearch({ isSearchShown: true });
    }
  }

  filterPosts = (pageNumber, postsPerPage = 10) => {
    const { posts: { items = [] }, searchInputText } = this.props;
    const start = (pageNumber - 1) * postsPerPage;
    const end = start + postsPerPage;
    if (searchInputText) {
      return items.filter((item) => item.title.includes(searchInputText));
    }
    return items.slice(start, end);
  }

  render() {
    const {
      editDialog: editTheDialog,
      hideDialog: hideTheDialog,
      updatePost: updateThePost,
      editForm,
      posts,
      searchInputText,
    } = this.props;
    const { pageNumber = 1 } = posts;
    return (
      <main>
        <DynamicViewWrapper
          isLoading={posts.isLoading}
          loader={(<CircularProgress />)}
          error={posts.error}
        >
          <PostItems
            items={this.filterPosts(pageNumber)}
            editDialog={(e) => editTheDialog(e)}
            searchInputText={searchInputText}
          />
        </DynamicViewWrapper>
        <FormDialog
          editForm={editForm}
          hideDialog={(e) => hideTheDialog(e)}
          updatePost={(e) => updateThePost(e)}
        />
        {!searchInputText
          && (
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
          )}
      </main>
    );
  }
}

PostsContainer.propTypes = {
  getPosts: PropTypes.func.isRequired,
  updatePageNumber: PropTypes.func.isRequired,
  editDialog: PropTypes.func.isRequired,
  hideDialog: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  editForm: PropTypes.instanceOf(Object),
  match: PropTypes.instanceOf(Object),
  posts: PropTypes.shape({
    isLoading: PropTypes.bool,
    pageNumber: PropTypes.number,
    items: PropTypes.instanceOf(Array),
    error: PropTypes.string,
  }),
  isSearchShown: PropTypes.string.isRequired,
  searchInputText: PropTypes.string,
};

PostsContainer.defaultProps = {
  posts: {
    isLoading: false,
    pageNumber: 1,
    items: [],
    error: '',
  },
  editForm: {
    id: 0,
    userId: 0,
    title: '',
    body: '',
  },
  match: {
    params: {
      pageNumber: '1',
    },
  },
  searchInputText: '',
};

const mapStateToProps = ({ posts, editForm, header }) => ({
  posts,
  editForm,
  searchInputText: header.searchInputText,
  isSearchShown: header.isSearchShown,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPosts,
  updatePost,
  showDialog,
  hideDialog,
  editDialog,
  updatePageNumber,
  toggleSearch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostsContainer));
