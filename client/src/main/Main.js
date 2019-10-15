import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getProjects, addProject, deleteProject } from '../actions/projectActions';
import ToolBar from './components/ToolBar';
import ProjectList from './components/ProjectList';

const styles = {
  container: {
    maxWidth: '1280px',
    padding: '0 1.5em',
    margin: '0 auto',
  },
};

class Main extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { classes, project, addProject, deleteProject } = this.props;
    return (
      <div className={classes.container}>
        <ToolBar
          addProject={addProject}
        />
        <ProjectList
          project={project}
          deleteProject={deleteProject}
        />
      </div>
    );
  }
}

Main.propTypes = {
  getProjects: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(
  mapStateToProps,
  {
    getProjects,
    addProject,
    deleteProject,
  },
)(withStyles(styles)(Main));
