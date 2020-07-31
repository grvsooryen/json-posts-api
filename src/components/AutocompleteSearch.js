import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';

import * as headerActions from '../actions/headerAction';

const styles = () => ({
  invisible: {
    visibility: 'hidden',
  },
  formPosition: {
    display: 'flex',
    position: 'absolute',
    right: '1.5rem',
  },
  datalistInput: {
    height: '48px',
    padding: '5px 10px',
  },
});
class AutocompleteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInputText: '',
    };
  }

  handleInput = (e) => {
    this.setState({
      searchInputText: e.target.value,
    });
    const { itemsList } = this.props;
    const suggestionSelected = itemsList
      .find((item) => item.title === e.target.value);

    if (suggestionSelected || e.target.value.trim() === '') {
      const { updateSearchInputText } = this.props;
      updateSearchInputText({ searchInputText: e.target.value.trim() });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { updateSearchInputText } = this.props;
    const { searchInputText } = this.state;
    updateSearchInputText({ searchInputText: searchInputText.trim() });
  }

  handleSearchIconClick() {
    const { isSearchInputShown, toggleSearchInput } = this.props;
    const { searchInputText } = this.state;
    toggleSearchInput({ isSearchInputShown: !isSearchInputShown });
    if (searchInputText) {
      this.handleInput({ target: { value: '' } });
    }
  }

  render() {
    const { searchInputText } = this.state;
    const {
      itemsList, isSearchInputShown, isSearchShown, classes,
    } = this.props;
    return isSearchShown
      ? (
        <>
          {isSearchInputShown
            ? (
              <>
                <IconButton className={classes.invisible}>
                  <SearchIcon />
                </IconButton>
                <div className={classes.formPosition}>
                  {/* <TextField
                  label="Search input"
                  autoFocus
                  list="itemsList"
                  InputProps={{ type: 'search', list: 'itemsList' }}
                /> */}
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="search"
                      list="itemsList"
                      className={classes.datalistInput}
                      onInput={this.handleInput}
                      value={searchInputText}
                      placeholder="Search"
                    />
                  </form>
                  <IconButton onClick={(e) => this.handleSearchIconClick(e)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </>
            )
            : (
              <IconButton onClick={(e) => this.handleSearchIconClick(e)}>
                <SearchIcon />
              </IconButton>
            )}
          <datalist id="itemsList">
            {itemsList.map((item) => (
              <option key={item.id} value={item.title}>{item.title}</option>))}
          </datalist>
        </>
      )
      : null;
  }
}

AutocompleteSearch.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  itemsList: PropTypes.instanceOf(Array),
  toggleSearchInput: PropTypes.func.isRequired,
  updateSearchInputText: PropTypes.func.isRequired,
  isSearchInputShown: PropTypes.bool.isRequired,
  isSearchShown: PropTypes.bool.isRequired,
};

AutocompleteSearch.defaultProps = {
  itemsList: [],
};

const mapStateToProps = ({ header }) => ({
  searchInputText: header.searchInputText,
  isSearchShown: header.isSearchShown,
  isSearchInputShown: header.isSearchInputShown,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleSearchInput: headerActions.toggleSearchInput,
  updateSearchInputText: headerActions.updateSearchInputText,
}, dispatch);

export default connect(
  mapStateToProps, mapDispatchToProps,
)(withStyles(styles)(AutocompleteSearch));
