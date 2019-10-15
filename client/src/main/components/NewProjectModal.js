import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({ });

class NewProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: null,
      projectDesc: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSubmit (event) {
    // TODO: Add input checking and error handling
    event.preventDefault();
    const { addProject } = this.props;
    const { projectName, projectDesc } = this.state;
    if (projectName === null || projectDesc === null) {
      console.log('please enter all required field.');
      return;
    }
    addProject({ projectName, projectDesc });
    this.handleClose(event);
  }

  handleClose (event) {
    event.preventDefault();
    const { onClose } = this.props;
    this.setState({
      projectName: null,
      projectDesc: null,
    }, onClose);
  }

  render() {
    const { show } = this.props;

    return (
      <Dialog
        open={show}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">New Project</DialogTitle>
        <DialogContent>
          <TextField
            id="project-name"
            label="Project Name"
            type="text"
            variant="outlined"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            required
            autoFocus
            value={this.state.projectName || ''}
            onChange={e => this.setState({ projectName: e.target.value })}
          />
          <TextField
            id="project-desc"
            label="Project Description"
            rows="4"
            rowsMax="4"
            variant="outlined"
            type="text"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
            multiline
            fullWidth
            value={this.state.projectDesc || ''}
            onChange={e => this.setState({ projectDesc: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} variant="outlined" color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NewProjectModal.defaultProps = {
  show: false,
};

NewProjectModal.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewProjectModal);
