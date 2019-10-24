import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { categoryOptions, technologyOptions } from '../static/options';

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

class NewProjectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: null,
      teamSize: null,
      startDate: new Date(),
      endDate: new Date(),
      projectCategory: [],
      projectDesc: null,
      projectEmail: null,
      projectGithub: null,
      projectTechnology: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onTechnologyChange = this.onTechnologyChange.bind(this);
  }

  handleSubmit(event) {
    // TODO: Add input checking and error handling
    event.preventDefault();
    const { addProject } = this.props;
    const { projectName, teamSize, startDate, endDate, projectCategory,
      projectTechnology, projectEmail, projectGithub, projectDesc } = this.state;
    console.log(this.state);
    if (projectName === null) {console.log('Please enter project name.'); return;}
    if (teamSize === null) {console.log('Please enter team size.'); return;}
    if (startDate > endDate) {console.log('End date must larger than start date.'); return;}
    if (Array.isArray(projectCategory)) {
      if (projectCategory.length === 0) {
        console.log('Please select at least one item for project category.');
        return;
      }
    } else {
      console.log('Unrecognizable project category type.');
      return;
    }
    if (Array.isArray(projectTechnology)) {
      if (projectTechnology.length === 0) {
        console.log('Please select at least one item for project technology.');
        return;
      }
    } else {
      console.log('Unrecognizable project technology type.');
      return;
    }
    if (projectEmail === null) {console.log('Please enter project email.'); return;}
    if (projectDesc === null) {console.log('please enter project desc.'); return;}
    addProject({ projectName, teamSize, startDate, endDate, projectCategory,
      projectTechnology, projectEmail, projectGithub, projectDesc });
    this.handleClose(event);
  }

  handleClose(event) {
    event.preventDefault();
    const { onClose } = this.props;
    this.setState({
      teamSize: null,
      startDate: new Date(),
      endDate: new Date(),
      projectName: null,
      projectDesc: null,
      projectEmail: null,
      projectGithub: null,
      projectCategory: [],
      projectTechnology: [],
    }, onClose);
  }

  onCategoryChange(event) {
    event.preventDefault();
    const values = event.target.value;
    if (values.length > 3) {
      console.log('You can specify at most three categories.');
    } else {
      this.setState({ projectCategory: values });
    }
  }

  onTechnologyChange(event) {
    event.preventDefault();
    const values = event.target.value;
    if (values.length > 10) {
      console.log('You can choose at most ten technologies.');
    } else {
      this.setState({ projectTechnology: values });
    }
  }

  render() {
    const { classes, show } = this.props;
    const { teamSize, startDate, endDate, projectName, projectCategory,
      projectTechnology, projectEmail, projectGithub, projectDesc } = this.state;

    const projectNameTextField = (
      <TextField
        id="project-name"
        label="Project Name"
        type="text"
        variant="outlined"
        margin="dense"
        fullWidth
        InputLabelProps={{ shrink: true }}
        required
        autoFocus
        value={projectName || ''}
        onChange={e => this.setState({ projectName: e.target.value })}
      />
    );

    const teamSizeTextField = (
      <TextField
        id="team-size"
        label="Team Size"
        type="text"
        variant="outlined"
        margin="dense"
        fullWidth
        InputLabelProps={{ shrink: true }}
        required
        value={teamSize || ''}
        onChange={e => this.setState({ teamSize: e.target.value })}
      />
    );

    const startDatePicker = (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          showTodayButton
          inputVariant="outlined"
          margin="dense"
          id="start-date-picker"
          label="Start Date *"
          format="MM/dd/yyyy"
          value={startDate}
          onChange={date => this.setState({ startDate: date })}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    );

    const endDatePicker = (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          showTodayButton
          inputVariant="outlined"
          margin="dense"
          id="end-date-picker"
          label="End Date *"
          format="MM/dd/yyyy"
          value={endDate}
          onChange={date => this.setState({ endDate: date })}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    );

    const projectCategoryTextField = (
      <TextField
        id="project-category"
        label="Project Category"
        type="text"
        variant="outlined"
        margin="dense"
        InputLabelProps={{ shrink: true }}
        select
        required
        fullWidth
        value={projectCategory}
        SelectProps={{
          multiple: true,
          fullWidth: true,
          onChange: this.onCategoryChange,
          renderValue: selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip
                  key={value}
                  label={value}
                  size={'small'}
                  className={classes.chip}
                />
              ))}
            </div>
          ),
          MenuProps: {
            className: classes.menu,
          },
        }}
      >
        {categoryOptions.map(item => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </TextField>
    );

    const projectTechnologyTextField = (
      <TextField
        id="project-technology"
        label="Technology"
        type="text"
        variant="outlined"
        margin="dense"
        InputLabelProps={{ shrink: true }}
        select
        required
        fullWidth
        value={projectTechnology}
        SelectProps={{
          multiple: true,
          fullWidth: true,
          onChange: this.onTechnologyChange,
          renderValue: selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip
                  key={value}
                  label={value}
                  size={'small'}
                  className={classes.chip}
                />
              ))}
            </div>
          ),
          MenuProps: {
            className: classes.menu,
          },
        }}
      >
        {technologyOptions.map(item => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </TextField>
    );

    const projectEmailTextField = (
      <TextField
        id="project-email"
        label="Project Email"
        type="email"
        autoComplete="email"
        variant="outlined"
        margin="dense"
        fullWidth
        InputLabelProps={{ shrink: true }}
        required
        value={projectEmail || ''}
        onChange={e => this.setState({ projectEmail: e.target.value })}
      />
    );

    const projectGithubTextField = (
      <TextField
        id="project-github"
        label="Project Github"
        type="url"
        variant="outlined"
        margin="dense"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={projectGithub || ''}
        onChange={e => this.setState({ projectGithub: e.target.value })}
      />
    );

    const projectDescTextField = (
      <TextField
        id="project-desc"
        label="Project Description"
        rows="4"
        rowsMax="4"
        variant="outlined"
        type="text"
        margin="dense"
        InputLabelProps={{ shrink: true }}
        required
        multiline
        fullWidth
        value={projectDesc || ''}
        onChange={e => this.setState({ projectDesc: e.target.value })}
      />
    );

    return (
      <Dialog
        open={show}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <DialogTitle id="form-dialog-title">New Project</DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            <Grid item xs container spacing={2}>
              <Grid item xs={12} sm>{projectNameTextField}</Grid>
              <Grid item xs={12} sm>{teamSizeTextField}</Grid>
            </Grid>
            <Grid item xs container spacing={2}>
              <Grid item xs={12} sm>{startDatePicker}</Grid>
              <Grid item xs={12} sm>{endDatePicker}</Grid>
            </Grid>
            <Grid item xs container>{projectCategoryTextField}</Grid>
            <Grid item xs container>{projectTechnologyTextField}</Grid>
            <Grid item xs container>{projectEmailTextField}</Grid>
            <Grid item xs container>{projectGithubTextField}</Grid>
            <Grid item xs container>{projectDescTextField}</Grid>
          </Grid>
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
