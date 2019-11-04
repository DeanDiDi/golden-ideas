import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import NewProjectModal from './NewProjectModal';
import ProjectFilter from './ProjectFilter'

const styles = theme => ({
  root: {
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
    const { classes, addProject, projectFilter, updateFilter } = this.props;

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
          updateFilter={updateFilter}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FilterListOutlinedIcon />}
          className={classes.button}
          onClick={() => console.log('projectFilter:', projectFilter)}
        >
          {`Filter (${123})`}
        </Button>
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
  projectFilter: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
};

export default withStyles(styles)(ToolBar);
