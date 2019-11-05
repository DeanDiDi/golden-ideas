import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getProjects, addProject, deleteProject, updateFilter, applyFilter } from './actions/projectListActions';
import ToolBar from './components/ToolBar';
import ProjectList from './components/ProjectList';
import Grid from '@material-ui/core/Grid';

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
    const { classes, projectList, addProject, deleteProject, updateFilter, applyFilter } = this.props;
    return (
      <Grid className={classes.container} container spacing={2}>
        <Grid item xs={12} sm={3}>
          <ToolBar
            addProject={addProject}
            updateFilter={updateFilter}
            applyFilter={applyFilter}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
        <ProjectList
          projectList={projectList}
          deleteProject={deleteProject}
        />
        </Grid>
      </Grid>
    );
  }
}

Main.propTypes = {
  projectList: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  applyFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projectList: state.projectList,
});

export default connect(
  mapStateToProps,
  {
    getProjects,
    addProject,
    deleteProject,
    updateFilter,
    applyFilter,
  },
)(withStyles(styles)(Main));
