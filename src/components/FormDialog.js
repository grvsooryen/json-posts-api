import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DEFAULT_FORM_VALUES = {
  isOpen: false,
  id: 0,
  title: '',
  body: '',
};

const validateMinimumLetters = (text = '') => {
  return text.length < 3;
}

class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...DEFAULT_FORM_VALUES,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.editForm.id !== state.id) {
      return {
        ...state,
        ...props.editForm,
      };
    }

    return state;
  }

  handleClickOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  handleClose = () => {
    const { hideDialog } = this.props;
    hideDialog();
    this.setState({
      ...DEFAULT_FORM_VALUES,
    });
  };

  handleSave = () => {
    const { hideDialog, updatePost, editForm } = this.props;
    const { title, body } = this.state;
    updatePost({
      id: editForm.id,
      title,
      body,
    });
    hideDialog();
    this.setState({
      ...DEFAULT_FORM_VALUES,
    });
  };

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  }

  handleBodyChange = (e) => {
    this.setState({
      body: e.target.value,
    });
  }

  render() {
    const { isOpen, title, body } = this.state;
    return (
      <div>
        <Dialog
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Post</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can edit the title and body of the post here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              value={title}
              error={validateMinimumLetters(title)}
              helperText={validateMinimumLetters(title) ? 'Should have minimum three characters' : ' '}
              onChange={this.handleTitleChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Body"
              type="text"
              value={body}
              error={validateMinimumLetters(body)}
              helperText={validateMinimumLetters(body) ? 'Should have minimum three characters' : ''}
              onChange={this.handleBodyChange}
              fullWidth
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleSave}
              color="primary"
              disabled={(validateMinimumLetters(title) || validateMinimumLetters(body))}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default FormDialog;