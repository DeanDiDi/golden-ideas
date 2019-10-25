import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import NewProjectModal from './NewProjectModal';
import ProjectFilter from './ProjectFilter'

const styles = theme => ({
  root: {
    // padding: theme.spacing(1, 2),
    marginTop: '1em',
  },
  button: {
    width: '100%',
  },
});

class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const { classes, addProject } = this.props;

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          className={classes.button}
          onClick={this.showModal}
        >
          Post Project
        </Button>
        <ProjectFilter
        />
        <NewProjectModal
          show={this.state.show}
          onClose={this.hideModal}
          addProject={addProject}
        />
      </div>
    );
  }
}

ToolBar.defaultProps = { };

ToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  addProject: PropTypes.func.isRequired,
};

export default withStyles(styles)(ToolBar);
