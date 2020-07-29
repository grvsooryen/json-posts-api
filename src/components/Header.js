import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AutocompleteSearch from './AutocompleteSearch';

const useStyles = makeStyles((theme) => ({
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
}));

function Header(props) {
  const classes = useStyles();
  const { title, itemsList } = props;

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

Header.propTypes = {
  title: PropTypes.string.isRequired,
  itemsList: PropTypes.instanceOf(Array),
};

Header.defaultProps = {
  itemsList: [],
};

export default Header;
