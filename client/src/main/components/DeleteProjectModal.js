import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


const styles = theme => ({ });

class DeleteProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (event) {
    event.preventDefault();
    const { projectId } = this.state;
    const url = '/api/projects/' + projectId;
    axios.delete(url)
      .then((response) => {
        console.log('Project deleted:', response);
        this.props.onClose();
      })
      .catch((error) => {
        console.log('error', error.response);
      });
  }

  render() {
    const { show, onClose } = this.props;

    return (
      <Dialog
        open={show}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Do you really want to delete this project? This process
              cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} variant="outlined" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteProjectModal.defaultProps = {
  show: false,
};

DeleteProjectModal.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default withStyles(styles)(DeleteProjectModal);
