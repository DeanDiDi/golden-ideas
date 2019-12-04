import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ProjetCard from './ProjectCard';

class ProjectList extends Component {
  render() {
    const { isLoading, filteredProjects } = this.props.projectList;

    // TODO: Add Loading component
    if (isLoading) return (<div />);

    return (
      <Fragment>
        {
          filteredProjects.map(
            project => (
              <ProjetCard
                key={project._id}
                id={project._id}
                privileged={this.props.secret===project.secret}
                projectName={project.name}
                teamSize={project.size}
                startDate={project.startDate}
                endDate={project.endDate}
                projectCategory={project.category}
                projectTechnology={project.technology}
                projectEmail={project.email}
                projectGithub={project.github}
                description={project.description}
                deleteProject={this.props.deleteProject}
              />
            )
          )
        }
      </Fragment>
    );
  }
}

ProjectList.propTypes = {
  projectList: PropTypes.object.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default ProjectList;
