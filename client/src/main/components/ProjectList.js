import React, { Component, Fragment } from 'react';
import uuid from 'uuid';
import ProjetCard from './ProjectCard';

class ProjectList extends Component {
  state = {
    projects: [
      { id: uuid(), name: 'test_project_1', createdTime: '09-01-2019' },
      { id: uuid(), name: 'test_project_2', createdTime: '08-23-2019'  },
      { id: uuid(), name: 'test_project_3', createdTime: '10-01-2019'  },
      { id: uuid(), name: 'test_project_4', createdTime: '09-11-2019'  },
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
                name={project.name}
                createdTime={project.createdTime}
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
