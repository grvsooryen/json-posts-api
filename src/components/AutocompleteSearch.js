import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';

class AutocompleteSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSearchInput: false,
    };
  }

  handleSearchIconClick() {
    const { showSearchInput } = this.state;
    this.setState({
      showSearchInput: !showSearchInput,
    });
  }

  render() {
    const { showSearchInput } = this.state;
    const { itemsList } = this.props;
    return (
      <>
        {showSearchInput
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
                <input
                  type="search"
                  list="itemsList"
                  placeholder="Search"
                />
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
    );
  }
}

AutocompleteSearch.propTypes = {
  itemsList: PropTypes.instanceOf(Array),
};

AutocompleteSearch.defaultProps = {
  itemsList: [],
};

export default AutocompleteSearch;
