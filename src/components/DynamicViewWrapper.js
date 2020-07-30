import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

class DynamicViewWrapper extends Component {
  conditionalRender() {
    const {
      isLoading, loader, error, children,
    } = this.props;
    if (isLoading) {
      return (<Grid container style={{ padding: '2rem' }} justify="center">{loader}</Grid>);
    }
    if (error) {
      return (<Grid container style={{ padding: '2rem' }} justify="center">{error}</Grid>);
    }

    return <>{children}</>;
  }

  render() {
    return (
      <div>
        {this.conditionalRender()}
      </div>
    );
  }
}

DynamicViewWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loader: PropTypes.element,
  children: PropTypes.element,
};

DynamicViewWrapper.defaultProps = {
  children: <>No Content</>,
  error: 'Something Went Wrong!!!',
  loader: <>Loading...</>,
};

export default DynamicViewWrapper;
