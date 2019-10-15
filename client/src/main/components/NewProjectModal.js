import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


const styles = theme => ({ });

class NewProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: null,
      projectDesc: null,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (event) {
    // TODO: Add input checking and error handling
    event.preventDefault();
    const { projectName, projectDesc } = this.state;
    if (projectName === null || projectDesc === null) {
      console.log('please enter all required field.');
      return;
    }
    axios.post('/api/projects', {
        // TODO: Remove hardcoded owner
        owner: '5d8174455b5acf228785ae79',
        name: projectName,
        description: projectDesc,
      })
      .then((response) => {
        console.log('New project added:', response);
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
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} variant="outlined" color="primary">
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
};

export default withStyles(styles)(NewProjectModal);
