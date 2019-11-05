import axios from 'axios';
import { GET_PROJECTS, ADD_PROJECT, DELETE_PROJECT, PROJECTS_LOADING, UPDATE_FILTER } from './types';

export const getProjects = () => dispatch => {
  dispatch(setProjectsLoading());
  axios.get('/api/projects')
    .then((response) => {
      dispatch({
        type: GET_PROJECTS,
        payload: response.data,
        loading: false,
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

export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING,
  };
};
