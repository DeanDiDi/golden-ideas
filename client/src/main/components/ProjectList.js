import React, { Component, Fragment } from 'react';
import ProjetCard from './ProjectCard';
import axios from 'axios';

class ProjectList extends Component {
  state = {
    isLoading: true,
    error: null,
    projects: [],
  }

  componentDidMount() {
    axios.get('/api/projects')
      .then((response) => {
        this.setState({
          projects: response.data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({
        error,
        isLoading: false,
      }));
  }

  render() {
    const { isLoading, projects } = this.state;
    // TODO: Add Loading component
    if (isLoading) return (<div />);
    return (
      <Fragment>
        {
          projects.map(
            project => (
              <ProjetCard
                key={project._id}
                id={project._id}
                name={project.name}
                date={project.date}
                description={project.description}
              />
            )
          )
        }
      </Fragment>
    );
  }
}

export default ProjectList;
