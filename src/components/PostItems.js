import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import EditIcon from '@material-ui/icons/Edit';

import Button from '@material-ui/core/Button';

class PostItems extends Component {
  handleEditClick(item) {
    const { editDialog } = this.props;
    editDialog(item);
  }

  render() {
    const { items } = this.props;
    return (
      <article>
        {
          items
            .map((item) => (
              <div key={item.id}>
                <h2>{item.title}</h2>
                <p>
                  {item.body}
                </p>
                <div style={{ textAlign: 'right' }}>
                  <Button aria-label="delete" color="primary" variant="outlined" onClick={() => this.handleEditClick(item)}>
                    <EditIcon />
                  </Button>
                  <Button component={Link} to={`/post/${item.id}`} variant="outlined" size="medium" color="primary">
                    Read More
                  </Button>
                </div>
              </div>
            ))
        }
      </article>
    );
  }
}

PostItems.propTypes = {
  items: PropTypes.instanceOf(Array),
};

PostItems.defaultProps = {
  items: [],
};

export default PostItems;
