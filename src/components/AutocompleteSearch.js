import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  toggleSearchInput,
  updateSearchInputText,
} from '../actions/headerAction';

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
    const { itemsList, isSearchInputShown, isSearchShown } = this.props;
    return isSearchShown
      ? (
        <>
          {isSearchInputShown
            ? (
              <>
                <IconButton style={{ visibility: 'hidden' }}>
                  <SearchIcon />
                </IconButton>
                <div style={{ display: 'flex', position: 'absolute', right: '1.5rem' }}>
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
                      style={{
                        height: '48px',
                        padding: '5px 10px',
                      }}
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
            {itemsList.map((item) => (<option value={item.title}>{item.title}</option>))}
          </datalist>
        </>
      )
      : null;
  }
}

AutocompleteSearch.propTypes = {
  itemsList: PropTypes.instanceOf(Array),
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
  toggleSearchInput,
  updateSearchInputText,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AutocompleteSearch);
