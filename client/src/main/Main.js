import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getProjects, addProject, deleteProject, updateFilter } from './actions/projectListActions';
import { getFilteredProjects } from './selectors/projectListSelector';
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
    const { classes, projectList, addProject, deleteProject, updateFilter } = this.props;

    return (
      <Grid className={classes.container} container spacing={2}>
        <Grid item xs={12} sm={3}>
          <ToolBar
            addProject={addProject}
            updateFilter={updateFilter}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
        <ProjectList
          secret={this.props.match.params.secret}
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
};

const mapStateToProps = (state) => ({
  projectList: {
    ...state.projectList,
    filteredProjects: getFilteredProjects(state),
  }
});

export default connect(
  mapStateToProps,
  {
    getProjects,
    addProject,
    deleteProject,
    updateFilter,
  },
)(withStyles(styles)(Main));
