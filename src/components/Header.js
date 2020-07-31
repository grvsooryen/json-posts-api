import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import AutocompleteSearch from './AutocompleteSearch';

const styles = (theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
});
class Header extends Component {
  render() {
    const { title, itemsList, classes } = this.props;
    return (
      <>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {title}
          </Typography>
          <AutocompleteSearch itemsList={itemsList} />
        </Toolbar>
      </>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  itemsList: PropTypes.instanceOf(Array),
};

Header.defaultProps = {
  itemsList: [],
};

export default withStyles(styles)(Header);
