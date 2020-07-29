import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DynamicViewWrapper extends Component {
  conditionalRender() {
    const {
      isLoading, loader, error, errorMessage, children,
    } = this.props;
    if (isLoading) {
      return (<div className="text-center">{loader}</div>);
    }
    if (error) {
      return (<div className="text-center">{errorMessage}</div>);
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
