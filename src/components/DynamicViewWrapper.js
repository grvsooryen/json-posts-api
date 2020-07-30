import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

class DynamicViewWrapper extends Component {
  conditionalRender() {
    const {
      isLoading, loader, error, errorMessage, children,
    } = this.props;
    if (isLoading) {
      return (<Grid container style={{ padding: '2rem' }} justify="center">{loader}</Grid>);
    }
    if (error) {
      return (<Grid container style={{ padding: '2rem' }} justify="center">{errorMessage}</Grid>);
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
  isLoading: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  loader: PropTypes.element,
  children: PropTypes.element,
  error: PropTypes.bool,
};

DynamicViewWrapper.defaultProps = {
  children: <>No Content</>,
  errorMessage: 'Something Went Wrong!!!',
  loader: <>Loading...</>,
  error: false,
};

export default DynamicViewWrapper;
