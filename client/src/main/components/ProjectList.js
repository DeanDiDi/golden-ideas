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
    const { projects } = this.state;
    return (
      <Fragment>
        {
          projects.map(
            project => (
              <ProjetCard
                key={project._id}
                name={project.name}
                date={project.date}
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
