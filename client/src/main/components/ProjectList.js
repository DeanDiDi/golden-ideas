import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjects } from '../../actions/projectActions';
import ProjetCard from './ProjectCard';

class ProjectList extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { isLoading, projects } = this.props.project;

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

ProjectList.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(
  mapStateToProps,
  {
    getProjects,
  },
)(ProjectList);
