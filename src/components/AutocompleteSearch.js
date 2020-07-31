import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core';

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
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="search"
                      list="itemsList"
                      className={classes.datalistInput}
                      onChange={this.handleInput}
                      value={searchInputText}
                      placeholder="Search"
                      data-testid="searchInput"
                    />
                  </form>
                  <IconButton onClick={(e) => this.handleSearchIconClick(e)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              </>
            )
            : (
              <IconButton role="button" name="search" onClick={(e) => this.handleSearchIconClick(e)}>
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
  itemsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
      userId: PropTypes.number,
    }),
  ),
  toggleSearchInput: PropTypes.func.isRequired,
  updateSearchInputText: PropTypes.func.isRequired,
  isSearchInputShown: PropTypes.bool.isRequired,
  isSearchShown: PropTypes.bool.isRequired,
};

AutocompleteSearch.defaultProps = {
  itemsList: [],
};

export default withStyles(styles)(AutocompleteSearch);
