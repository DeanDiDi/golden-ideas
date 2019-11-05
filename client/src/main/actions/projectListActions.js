import axios from 'axios';
import { GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT, PROJECTS_LOADING, UPDATE_FILTER, UPDATE_PROJECTS } from './types';

export const getProjects = () => dispatch => {
  dispatch(setProjectsLoading());
  axios.get('/api/projects')
    .then((response) => {
      dispatch({
        type: GET_PROJECTS,
        payload: response.data,
      });
      dispatch({
        type: UPDATE_PROJECTS,
        payload: response.data,
      });
    });
};

export const addProject = project => dispatch => {
  axios.post('/api/projects', {
    // TODO: Remove hardcoded owner
    owner: '5d8174455b5acf228785ae79',
    name: project.projectName,
    size: project.teamSize,
    startDate: project.startDate,
    endDate: project.endDate,
    category: project.projectCategory,
    technology: project.projectTechnology,
    email: project.projectEmail,
    github: project.projectGithub,
    description: project.projectDesc,
  })
  .then((response) =>
    dispatch({
      type: ADD_PROJECT,
      payload: response.data,
    })
  )
  .catch((error) => {
    console.log('error', error.response);
  });
};

export const deleteProject = projectId => dispatch => {
  axios.delete(`/api/projects/${projectId}`)
    .then((response) =>
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      })
    )
    .catch((error) => {
      console.log('error', error.response);
    });
};

export const updateFilter = (filterType, data) => dispatch => {
  dispatch({
    type: UPDATE_FILTER,
    filterType,
    data,
  });
};

export const applyFilter = () => (dispatch, getState) => {
  const state = getState();
  const { projects, filters } = state.projectList;
  const { teamSizeFilter, categoryFilter, technologyFilter } = filters;

  dispatch(setProjectsLoading());

  const filteredProjects = projects.filter(
    project => {
      const { size, category: projectCategory, technology: projectTechnology } = project;
      const noSize = Object.keys(teamSizeFilter).length === 0 && teamSizeFilter.constructor === Object;
      const inSize = teamSizeFilter.minValue <= size && size <= teamSizeFilter.maxValue;
      const noCategory = Array.isArray(categoryFilter) && !categoryFilter.length;
      const inCategory = categoryFilter.every(category => projectCategory.includes(category));
      const noTechnology = Array.isArray(technologyFilter) && !technologyFilter.length;
      const inTechnology = technologyFilter.every(technology => projectTechnology.includes(technology));
      return (noSize || inSize) && (noCategory || inCategory) && (noTechnology || inTechnology);
    }
  );

  dispatch({
    type: UPDATE_PROJECTS,
    payload: filteredProjects,
  });
};

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};
