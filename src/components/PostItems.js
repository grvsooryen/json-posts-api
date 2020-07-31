import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

class PostItems extends Component {
  handleEditClick(item) {
    const { editDialog } = this.props;
    editDialog(item);
  }

  renderNoResult() {
    const { searchInputText } = this.props;
    if (searchInputText) {
      return (<p>No Results Found</p>);
    }
    return (<p>You do not have any posts</p>);
  }

  render() {
    const { items } = this.props;
    return (
      <article>
        {items.length
          ? items
            .map((item) => (
              <div key={item.id}>
                <h2>{item.title}</h2>
                <p>
                  {item.body}
                </p>
                <Grid container justify="space-between">
                  <Button component={Link} to={`/post/${item.id}`} size="medium" variant="contained" color="secondary">
                    Read More
                  </Button>
                  <Button aria-label="edit" color="primary" variant="outlined" onClick={() => this.handleEditClick(item)}>
                    <EditIcon />
                  </Button>
                </Grid>
              </div>
            ))
          : this.renderNoResult()}
      </article>
    );
  }
}

PostItems.propTypes = {
  editDialog: PropTypes.func.isRequired,
  items: PropTypes.instanceOf(Array),
  searchInputText: PropTypes.string,
};

PostItems.defaultProps = {
  items: [],
  searchInputText: '',
};

export default PostItems;
