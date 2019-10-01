import React, { Component, Fragment } from 'react';
import uuid from 'uuid';
import ProjetCard from './ProjectCard';

class ProjectList extends Component {
  state = {
    projects: [
      { id: uuid(), name: 'test_project_1' },
      { id: uuid(), name: 'test_project_2' },
      { id: uuid(), name: 'test_project_3' },
      { id: uuid(), name: 'test_project_4' },
    ]
  }

  render() {
    const { projects } = this.state;
    return (
      <Fragment>
        {
          projects.map(
            project => (
              <ProjetCard
                key={project.id}
                projectName={project.name}
              />
            )
          )
        }
        <ProjetCard />
      </Fragment>
    );
  }
}

export default ProjectList;
